import { getPageContent, onLinkNavigate, transitionHelper, getLink } from './utils.js';

const galleryPath = '/';
const imagesPath = `${galleryPath}images/`;

function getNavigationType(fromPath, toPath) {
  if (fromPath.startsWith(imagesPath) && toPath === galleryPath) {
    return 'image-page-to-gallery';
  }

  if (fromPath === galleryPath && toPath.startsWith(imagesPath)) {
    return 'gallery-to-image-page';
  }

  return 'other';
}

onLinkNavigate(async ({ fromPath, toPath }) => {
  const navigationType = getNavigationType(fromPath, toPath);
  const content = await getPageContent(toPath);

  let targetThumbnail;

  if (navigationType === 'gallery-to-image-page') {
    targetThumbnail = getLink(toPath).querySelector('img');
    targetThumbnail.style.viewTransitionName = 'full-size';
  }

  const transition = transitionHelper({
    updateDOM() {
      document.body.innerHTML = content;

      if (navigationType === 'image-page-to-gallery') {
        targetThumbnail = getLink(fromPath).querySelector('img');
        targetThumbnail.style.viewTransitionName = 'full-size';
      }
    },
  });

  transition.finished.finally(() => {
    if (targetThumbnail) targetThumbnail.style.viewTransitionName = '';
  });
});
