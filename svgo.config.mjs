export default {
  plugins: [
    {
      name: "removeDimensions",
      active: true,
    },
    {
      name: "removeAttrs",
      params: {
        attrs: "(fill|stroke|style)",
      },
    },
    {
      name: "addAttributesToSVGElement",
      params: {
        attributes: [{ fill: "currentColor" }],
      },
    },
  ],
}