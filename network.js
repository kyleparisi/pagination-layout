const data = [{"links":{"e826ddf0-204e-11e9-a9d4-bd73af05ca9d":{"direction":"->","source":{"node":"81dd85e0-204d-11e9-8a5f-8122a72dc5f4","port":"true"},"target":{"node":"d1432fd0-204e-11e9-a9d4-bd73af05ca9d","port":"data"},"id":"e826ddf0-204e-11e9-a9d4-bd73af05ca9d","layer_id":0},"34d880e0-204f-11e9-a9d4-bd73af05ca9d":{"direction":"->","source":{"node":"d1432fd0-204e-11e9-a9d4-bd73af05ca9d","port":"data"},"target":{"node":"1be098c0-204f-11e9-a9d4-bd73af05ca9d","port":"data"},"id":"34d880e0-204f-11e9-a9d4-bd73af05ca9d","layer_id":0},"ad2f4310-20a1-11e9-af01-637ab5bb2d38":{"direction":"->","source":{"node":"748e1630-2042-11e9-8a5f-8122a72dc5f4","port":"pages"},"target":{"node":"591c2130-20a1-11e9-af01-637ab5bb2d38","port":"data"},"id":"ad2f4310-20a1-11e9-af01-637ab5bb2d38","layer_id":0},"b1ca9d20-20a1-11e9-af01-637ab5bb2d38":{"direction":"->","source":{"node":"591c2130-20a1-11e9-af01-637ab5bb2d38","port":"data"},"target":{"node":"81dd85e0-204d-11e9-8a5f-8122a72dc5f4","port":"pages"},"id":"b1ca9d20-20a1-11e9-af01-637ab5bb2d38","layer_id":0,"logging":false},"dddba9e0-217d-11e9-a3d0-d5b60bade254":{"direction":"->","source":{"node":"81dd85e0-204d-11e9-8a5f-8122a72dc5f4","port":"false"},"target":{"node":"5387fb40-217d-11e9-a3d0-d5b60bade254","port":"data"},"id":"dddba9e0-217d-11e9-a3d0-d5b60bade254","layer_id":0},"df3a9da0-217d-11e9-a3d0-d5b60bade254":{"direction":"->","source":{"node":"5387fb40-217d-11e9-a3d0-d5b60bade254","port":"data"},"target":{"node":"1ebbcba0-20a4-11e9-8401-3ff0562c2761","port":"data"},"id":"df3a9da0-217d-11e9-a3d0-d5b60bade254","layer_id":0},"a55eebf0-2181-11e9-b98c-ef62f10eaa97":{"direction":"->","source":{"node":"81dd85e0-204d-11e9-8a5f-8122a72dc5f4","port":"false"},"target":{"node":"97912380-2181-11e9-b98c-ef62f10eaa97","port":"data"},"id":"a55eebf0-2181-11e9-b98c-ef62f10eaa97","layer_id":0},"db0beb40-2181-11e9-8f30-afebba4f4d75":{"direction":"->","source":{"node":"97912380-2181-11e9-b98c-ef62f10eaa97","port":"data"},"target":{"node":"c2d88ba0-2181-11e9-b98c-ef62f10eaa97","port":"data"},"id":"db0beb40-2181-11e9-8f30-afebba4f4d75","layer_id":0},"49e6d340-2182-11e9-8f30-afebba4f4d75":{"direction":"->","source":{"node":"c2d88ba0-2181-11e9-b98c-ef62f10eaa97","port":"data"},"target":{"node":"1be098c0-204f-11e9-a9d4-bd73af05ca9d","port":"data"},"id":"49e6d340-2182-11e9-8f30-afebba4f4d75","layer_id":0,"logging":false},"14e27a90-2183-11e9-a5ca-c33d89b1c6f7":{"direction":"->","source":{"node":"5387fb40-217d-11e9-a3d0-d5b60bade254","port":"false"},"target":{"node":"aa578010-20a3-11e9-8401-3ff0562c2761","port":"data"},"id":"14e27a90-2183-11e9-a5ca-c33d89b1c6f7","layer_id":0},"16c8edd0-2183-11e9-a5ca-c33d89b1c6f7":{"direction":"->","source":{"node":"97912380-2181-11e9-b98c-ef62f10eaa97","port":"false"},"target":{"node":"aa578010-20a3-11e9-8401-3ff0562c2761","port":"data"},"id":"16c8edd0-2183-11e9-a5ca-c33d89b1c6f7","layer_id":0},"9690dfa0-2183-11e9-a5ca-c33d89b1c6f7":{"direction":"->","source":{"node":"6a572fb0-20bc-11e9-ba36-41184c4609c5","port":"data"},"target":{"node":"1be098c0-204f-11e9-a9d4-bd73af05ca9d","port":"data"},"id":"9690dfa0-2183-11e9-a5ca-c33d89b1c6f7","layer_id":0},"ecf2ac70-2183-11e9-a2cd-d943fbf3448c":{"direction":"->","source":{"node":"aa578010-20a3-11e9-8401-3ff0562c2761","port":"data"},"target":{"node":"6a572fb0-20bc-11e9-ba36-41184c4609c5","port":"data"},"id":"ecf2ac70-2183-11e9-a2cd-d943fbf3448c","layer_id":0},"393bd420-2185-11e9-94b4-a3e8d4f4dc01":{"direction":"->","source":{"node":"1ebbcba0-20a4-11e9-8401-3ff0562c2761","port":"data"},"target":{"node":"1be098c0-204f-11e9-a9d4-bd73af05ca9d","port":"data"},"id":"393bd420-2185-11e9-94b4-a3e8d4f4dc01","layer_id":0}}}];
const Channel = require("async-csp").Channel;
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

        if (outputData === Channel.DONE) {
          return false;
        }

        input.put(outputData);

        leftToRightmiddleware.call(this).catch(() => {});
      }

      leftToRightmiddleware.call(this).catch(console.log);
    }

    // output side of link
    if (
      !!(
        engine.outputs[source.node] && engine.outputs[source.node][source.port]
      )
    ) {
      // fork channel
      const piper = new Channel();
      piper.pipe(engine.outputs[source.node][source.port], output);
      engine.outputs[source.node][source.port] = piper;
    } else {
      // new channel
      engine.outputs[source.node] = engine.outputs[source.node] || {};
      engine.outputs[source.node][source.port] = output;
    }

    // input side of link
    if (engine.inputs[target.node] && engine.inputs[target.node][target.port]) {
      // merge channels
      engine.inputs[target.node][target.port] = engine.inputs[target.node][
        target.port
        ].merge(input);
    } else {
      // new channel
      engine.inputs[target.node] = engine.inputs[target.node] || {};
      engine.inputs[target.node][target.port] = input;
    }
  });
});

module.exports = function() {
  (async () => {
    const inputs = engine.inputs["748e1630-2042-11e9-8a5f-8122a72dc5f4"];
    const outputs = engine.outputs["748e1630-2042-11e9-8a5f-8122a72dc5f4"];

    if (arguments.length) {
      outputs.pages.put({ pages: arguments[0], currentPage: arguments[1] });
    } else {
      //outputs.pages.put({pages: [[], [], [], [],[], [],[], [],[], []], currentPage: 7});
    }
  })(arguments);
  (async () => {
    const inputs = engine.inputs["81dd85e0-204d-11e9-8a5f-8122a72dc5f4"];
    const outputs = engine.outputs["81dd85e0-204d-11e9-8a5f-8122a72dc5f4"];

    const pages = await inputs.pages.take();
    if (pages.pages.length <= 7 && outputs.true) {
      outputs.true.put(pages);
    } else {
      outputs.false.put(pages);
    }
  })(arguments);
  (async () => {
    const inputs = engine.inputs["d1432fd0-204e-11e9-a9d4-bd73af05ca9d"];
    const outputs = engine.outputs["d1432fd0-204e-11e9-a9d4-bd73af05ca9d"];

    const data = await inputs.data.take();
    const view = [];
    for (let i = 1; i <= data.pages.length; i++) {
      view.push(i);
    }
    data.view = view;
    outputs.data.put(data);
  })(arguments);
  (async () => {
    const inputs = engine.inputs["1be098c0-204f-11e9-a9d4-bd73af05ca9d"];
    const outputs = engine.outputs["1be098c0-204f-11e9-a9d4-bd73af05ca9d"];

    const data = await inputs.data.take();
    try {
      cb(data);
    } catch (e) {
      console.log(data);
    }
  })(arguments);
  (async () => {
    const inputs = engine.inputs["591c2130-20a1-11e9-af01-637ab5bb2d38"];
    const outputs = engine.outputs["591c2130-20a1-11e9-af01-637ab5bb2d38"];

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
    const inputs = engine.inputs["aa578010-20a3-11e9-8401-3ff0562c2761"];
    const outputs = engine.outputs["aa578010-20a3-11e9-8401-3ff0562c2761"];

    await inputs.data.take();
    const data = await inputs.data.take();
    outputs.data.put(data);
  })(arguments);
  (async () => {
    const inputs = engine.inputs["1ebbcba0-20a4-11e9-8401-3ff0562c2761"];
    const outputs = engine.outputs["1ebbcba0-20a4-11e9-8401-3ff0562c2761"];

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
    const inputs = engine.inputs["6a572fb0-20bc-11e9-ba36-41184c4609c5"];
    const outputs = engine.outputs["6a572fb0-20bc-11e9-ba36-41184c4609c5"];

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
    const inputs = engine.inputs["5387fb40-217d-11e9-a3d0-d5b60bade254"];
    const outputs = engine.outputs["5387fb40-217d-11e9-a3d0-d5b60bade254"];

    const data = await inputs.data.take();
    if (data.pages.length - data.currentPage <= 3) {
      outputs.data.put(data);
    } else {
      outputs.false.put(data);
    }
  })(arguments);
  (async () => {
    const inputs = engine.inputs["97912380-2181-11e9-b98c-ef62f10eaa97"];
    const outputs = engine.outputs["97912380-2181-11e9-b98c-ef62f10eaa97"];

    const data = await inputs.data.take();
    if (data.currentPage <= 3) {
      outputs.data.put(data);
    } else {
      outputs.false.put(data);
    }
  })(arguments);
  (async () => {
    const inputs = engine.inputs["c2d88ba0-2181-11e9-b98c-ef62f10eaa97"];
    const outputs = engine.outputs["c2d88ba0-2181-11e9-b98c-ef62f10eaa97"];

    const data = await inputs.data.take();
    const render = [1, 2, 3, 4, 5, "...", data.pages.length];
    data.render = render;
    outputs.data.put(data);
  })(arguments);
};