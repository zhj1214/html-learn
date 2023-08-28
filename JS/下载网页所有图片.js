// 下载图片
$$('img').forEach(async (img) => {
  try {
    const src = img.src;
    // Fetch the image as a blob.
    const fetchResponse = await fetch(src);
    const blob = await fetchResponse.blob();
    const mimeType = blob.type;
    // Figure out a name for it from the src and the mime-type.
    const start = src.lastIndexOf('/') + 1;
    const end = src.indexOf('.', start);
    let name = src.substring(start, end === -1 ? undefined : end);
    name = name.replace(/[^a-zA-Z0-9]+/g, '-');
    name += '.' + mimeType.substring(mimeType.lastIndexOf('/') + 1);
    // Download the blob using a <a> element.
    const a = document.createElement('a');
    a.setAttribute('href', URL.createObjectURL(blob));
    a.setAttribute('download', name);
    a.click();
  } catch (e) {
    console.log('报错了:', e);
  }
})
// 下载视频
$$('video').forEach(async (img) => {
  try {
    const src = img.src;
    console.log('--src--', src);
    // Fetch the image as a blob.
    const fetchResponse = await fetch(src);
    const blob = await fetchResponse.blob();
    const mimeType = blob.type;
    // Figure out a name for it from the src and the mime-type.
    const start = src.lastIndexOf('/') + 1;
    const end = src.indexOf('.', start);
    console.log('--start--', start);
    console.log('--end--', end);

    let name = src.substring(start, end === -1 ? undefined : end);
    name = name.replace(/[^a-zA-Z0-9]+/g, '-');
    name += '.' + mimeType.substring(mimeType.lastIndexOf('/') + 1);
    console.log('--name--', name);
    //  Download the blob using a <a> element.
    const a = document.createElement('a');
    a.setAttribute('href', URL.createObjectURL(blob));
    a.setAttribute('download', name);
    a.click();
  } catch (e) {
    console.log('报错了:', e);
  }
})