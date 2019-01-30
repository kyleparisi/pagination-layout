module.exports = function() {
  const data = [
    {
      links: {
        "1": {
          direction: "->",
          source: {
            node: "2",
            port: "true"
          },
          target: {
            node: "3",
            port: "data"
          },
          id: "1",
          layer_id: 0
        },
        "4": {
          direction: "->",
          source: {
            node: "3",
            port: "data"
          },
          target: {
            node: "5",
            port: "data"
          },
          id: "4",
          layer_id: 0
        },
        "6": {
          direction: "->",
          source: {
            node: "7",
            port: "pages"
          },
          target: {
            node: "8",
            port: "data"
          },
          id: "6",
          layer_id: 0
        },
        "9": {
          direction: "->",
          source: {
            node: "8",
            port: "data"
          },
          target: {
            node: "2",
            port: "pages"
          },
          id: "9",
          layer_id: 0,
          logging: false
        },
        "10": {
          direction: "->",
          source: {
            node: "2",
            port: "false"
          },
          target: {
            node: "11",
            port: "data"
          },
          id: "10",
          layer_id: 0
        },
        "12": {
          direction: "->",
          source: {
            node: "11",
            port: "data"
          },
          target: {
            node: "14",
            port: "data"
          },
          id: "12",
          layer_id: 0
        },
        "13": {
          direction: "->",
          source: {
            node: "2",
            port: "false"
          },
          target: {
            node: "15",
            port: "data"
          },
          id: "13",
          layer_id: 0
        },
        "16": {
          direction: "->",
          source: {
            node: "15",
            port: "data"
          },
          target: {
            node: "17",
            port: "data"
          },
          id: "16",
          layer_id: 0
        },
        "18": {
          direction: "->",
          source: {
            node: "17",
            port: "data"
          },
          target: {
            node: "5",
            port: "data"
          },
          id: "18",
          layer_id: 0,
          logging: false
        },
        "19": {
          direction: "->",
          source: {
            node: "11",
            port: "false"
          },
          target: {
            node: "20",
            port: "data"
          },
          id: "19",
          layer_id: 0
        },
        "21": {
          direction: "->",
          source: {
            node: "15",
            port: "false"
          },
          target: {
            node: "20",
            port: "data"
          },
          id: "21",
          layer_id: 0
        },
        "22": {
          direction: "->",
          source: {
            node: "23",
            port: "data"
          },
          target: {
            node: "5",
            port: "data"
          },
          id: "22",
          layer_id: 0
        },
        "24": {
          direction: "->",
          source: {
            node: "20",
            port: "data"
          },
          target: {
            node: "23",
            port: "data"
          },
          id: "24",
          layer_id: 0
        },
        "25": {
          direction: "->",
          source: {
            node: "14",
            port: "data"
          },
          target: {
            node: "5",
            port: "data"
          },
          id: "25",
          layer_id: 0
        }
      }
    }
  ];
  const Channel = function() {
    return new Proxy(
      {
        takes: [],
        puts: []
      },
      {
        get: function(obj, prop) {
          if (prop === "take") {
            // if puts ready (upstream)
            if (obj.puts.length) {
              return () => obj.puts.shift();
            }
            // no puts ready (might happen downstream)
            let ref;
            const prom = new Promise(resolve => (ref = resolve));
            obj.takes.push(ref);
            return () => prom;
          }
          if (prop === "put") {
            // if takes ready (upstream)
            if (obj.takes.length) {
              return obj.takes.shift();
            }
            // no takes ready (might happen downstream);
            const fn = data => {
              obj.puts.push(new Promise(resolve => resolve(data)));
            };
            return fn;
          }
        }
      }
    );
  };
  const engine = {
    outputs: {},
    inputs: {}
  };
  // Links
  data.map(layer => {
    const links = layer.links;
    Object.keys(links).map(link_id => {
      const link = links[link_id];
      const input = new Channel();
      const output = new Channel();
      const { source, target, direction = "->" } = link;

      // animation of packet, one direction
      if (direction === "->") {
        async function leftToRightmiddleware() {
          let outputData = await output.take();

          if (typeof outputData === "symbol") {
            console.log("link closed");
            return false;
          }

          if (link.logging) {
            console.log(outputData);
          }
          // input.put(JSON.parse(JSON.stringify(outputData)));
          input.put(outputData);

          leftToRightmiddleware.call(this).catch(() => {});
        }

        leftToRightmiddleware.call(this).catch(console.log);
      }

      // output side of link
      if (
        !!(
          engine.outputs[source.node] &&
          engine.outputs[source.node][source.port]
        )
      ) {
        // fork channel
        const pipe = new Channel();
        const originalChan = engine.outputs[source.node][source.port];
        (async () => {
          while (pipe) {
            const data = await pipe.take();
            originalChan.put(data);
            output.put(data);
          }
        })();
        engine.outputs[source.node][source.port] = pipe;
      } else {
        // new channel
        engine.outputs[source.node] = engine.outputs[source.node] || {};
        engine.outputs[source.node][source.port] = output;
      }

      // input side of link
      if (
        engine.inputs[target.node] &&
        engine.inputs[target.node][target.port]
      ) {
        const newChannel = new Channel();
        const originalChannel = engine.inputs[target.node][target.port];
        engine.inputs[target.node][target.port] = newChannel;

        (async () => {
          const data = await originalChannel.take();
          engine.inputs[target.node][target.port].put(data);
        })();
        (async () => {
          const data = await input.take();
          engine.inputs[target.node][target.port].put(data);
        })();
      } else {
        // new channel
        engine.inputs[target.node] = engine.inputs[target.node] || {};
        engine.inputs[target.node][target.port] = input;
      }
    });
  });

  (async () => {
    const inputs = engine.inputs["7"];
    const outputs = engine.outputs["7"];

    if (arguments.length) {
      outputs.pages.put({ pages: arguments[0], currentPage: arguments[1] });
    } else {
      //outputs.pages.put({pages: [[], [], [], [],[], [],[], [],[], []], currentPage: 7});
    }
  })(arguments);
  (async () => {
    const inputs = engine.inputs["2"];
    const outputs = engine.outputs["2"];

    const pages = await inputs.pages.take();
    if (pages.pages.length <= 7 && outputs.true) {
      outputs.true.put(pages);
    } else {
      outputs.false.put(pages);
    }
  })(arguments);
  (async () => {
    const inputs = engine.inputs["3"];
    const outputs = engine.outputs["3"];

    const data = await inputs.data.take();
    const view = [];
    for (let i = 1; i <= data.pages.length; i++) {
      view.push(i);
    }
    data.view = view;
    outputs.data.put(data);
  })(arguments);
  (async () => {
    const inputs = engine.inputs["5"];
    const outputs = engine.outputs["5"];

    const data = await inputs.data.take();
    try {
      cb(data);
    } catch (e) {
      console.log(data);
    }
  })(arguments);
  (async () => {
    const inputs = engine.inputs["8"];
    const outputs = engine.outputs["8"];

    const data = await inputs.data.take();
    if (!data.pages || !data.pages.length) {
      return false;
    }
    data.currentPage = data.currentPage || 1;
    if (data.currentPage > data.pages.length) {
      console.warn(
        "Page selection is out of bounds.  Picking array length as current page."
      );
      data.currentPage = data.pages.length;
    }
    if (data.currentPage < 1) {
      console.warn(
        "Page selection is out of bounds.  Picking array length as current page."
      );
      data.currentPage = 1;
    }
    outputs.data.put(data);
  })(arguments);
  (async () => {
    const inputs = engine.inputs["20"];
    const outputs = engine.outputs["20"];

    await inputs.data.take();
    const data = await inputs.data.take();
    outputs.data.put(data);
  })(arguments);
  (async () => {
    const inputs = engine.inputs["14"];
    const outputs = engine.outputs["14"];

    const data = await inputs.data.take();
    const { pages } = data;
    const render = [];
    const renderFrom = pages.length - 4;
    for (let i = pages.length; i >= renderFrom; i--) {
      render.unshift(i);
    }
    render.unshift(1, "...");
    data.render = render;
    outputs.data.put(data);
  })(arguments);
  (async () => {
    const inputs = engine.inputs["23"];
    const outputs = engine.outputs["23"];

    const data = await inputs.data.take();
    const { currentPage, pages } = data;
    const render = [1, "..."];
    render.push(currentPage - 1);
    render.push(currentPage);
    render.push(currentPage + 1);
    render.push("...", pages.length);
    data.render = render;
    outputs.data.put(data);
  })(arguments);
  (async () => {
    const inputs = engine.inputs["11"];
    const outputs = engine.outputs["11"];

    const data = await inputs.data.take();
    if (data.pages.length - data.currentPage <= 3) {
      outputs.data.put(data);
    } else {
      outputs.false.put(data);
    }
  })(arguments);
  (async () => {
    const inputs = engine.inputs["15"];
    const outputs = engine.outputs["15"];

    const data = await inputs.data.take();
    if (data.currentPage <= 3) {
      outputs.data.put(data);
    } else {
      outputs.false.put(data);
    }
  })(arguments);
  (async () => {
    const inputs = engine.inputs["17"];
    const outputs = engine.outputs["17"];

    const data = await inputs.data.take();
    const render = [1, 2, 3, 4, 5, "...", data.pages.length];
    data.render = render;
    outputs.data.put(data);
  })(arguments);
};
