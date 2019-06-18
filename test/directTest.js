const { Maker } = require("../dist/main");
const path = require("path");
const fs = require("fs");

const aspectRatio = 3 / 2;
const photoBorder = {
  background: { r: 255, g: 255, b: 255 },
  top: 4,
  bottom: 4,
  left: 4,
  right: 4
};

const total_border = {
  background: { r: 255, g: 255, b: 255, alpha: 1 },
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
};
const width = 1796;
const height = 1204;
const borderDistance = Math.ceil(width * 0.02);
const lineDistance = Math.ceil(width * 0.01);

const bigPhotoHeight = Math.floor(0.6 * height);
const bigPhotoWidth = Math.floor(bigPhotoHeight * aspectRatio);
const bigPhoto = {
  width: bigPhotoWidth,
  height: bigPhotoHeight,
  y: total_border.top + borderDistance,
  x: width - bigPhotoWidth - borderDistance - total_border.right
};

const smallPhotoHeight =
  height -
  photoBorder.top -
  photoBorder.bottom -
  2 * borderDistance -
  bigPhoto.height -
  lineDistance;
const smallPhoto = {
  width: Math.floor(smallPhotoHeight * aspectRatio),
  height: smallPhotoHeight,
  y: photoBorder.top + borderDistance + bigPhoto.height + lineDistance
};
const smallPhotoHorizontalDistance =
  (width -
    total_border.left -
    total_border.right -
    2 * borderDistance -
    3 * smallPhoto.width) /
  2;
const calculateXForSmallPhoto = i =>
  Math.floor(
    total_border.left +
      borderDistance +
      i * (smallPhoto.width + smallPhotoHorizontalDistance)
  );

const template = {
  id: "Default Template",
  width,
  height,
  border: total_border,
  background: path.join(__dirname, "background.jpg"),
  spaces: [
    {
      type: "photo",
      description: "Foto Reihe 1 rechts",
      ...bigPhoto,
      rotation: 2,
      border: photoBorder
    },
    {
      type: "photo",
      description: "Foto Reihe 2 links",
      ...smallPhoto,
      x: calculateXForSmallPhoto(0),
      rotation: 355,
      border: photoBorder
    },
    {
      type: "photo",
      description: "Foto Reihe 2 mitte",
      ...smallPhoto,
      x: calculateXForSmallPhoto(1),
      rotation: 4,
      border: photoBorder
    },
    {
      type: "photo",
      description: "Foto Reihe 2 rechts",
      ...smallPhoto,
      x: calculateXForSmallPhoto(2),
      rotation: 358,
      border: photoBorder
    }
  ]
};

(async () => {
  const maker = new Maker();
  const buffer = await maker.createCollage(template, [
    path.join(__dirname, "deer.jpg"),
    path.join(__dirname, "giraffe.jpg"),
    path.join(__dirname, "kitty.jpg"),
    path.join(__dirname, "rabbit.jpg")
  ]);

  fs.writeFileSync(path.join(__dirname, "../assets/out.jpg"), buffer);
})().catch(console.error);
