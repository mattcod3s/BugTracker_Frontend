// convert.js
const { NodeIO, Primitive } = require('@gltf-transform/core')

const dothis = async () => {
  const io = new NodeIO();
  const doc = await io.read('static/models/Duck/glTF-Binary/Duck.glb');

  for (const mesh of doc.getRoot().listMeshes()) {
    for (const prim of mesh.listPrimitives()) {
      prim.setIndices(null);
      prim.setMode(Primitive.Mode.POINTS);
    }
  }

  io.write('output.glb', doc);
}

dothis()