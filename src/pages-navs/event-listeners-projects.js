import _ from "lodash";
import { getProjectsBarFooterNodes } from "./static-selectors";
import {
  handleMovePrevProjectsPage,
  handleMoveNextProjectsPage,
} from "./projects-handlers";
import { KEYPRESS_THROTTLE_TIME, safeThrottle, showErrorModal } from "../utils";

export function addListenersProjectsPagesNav(application) {
  const { prevPageBtn, nextPageBtn } = getProjectsBarFooterNodes();

  const handleMovePrevProjectsPageThrottle = safeThrottle(
    (e, app) => handleMovePrevProjectsPage(e, app),
    showErrorModal,
    KEYPRESS_THROTTLE_TIME,
  );

  prevPageBtn.addEventListener("click", (e) =>
    handleMovePrevProjectsPageThrottle(e, application),
  );
  prevPageBtn.addEventListener("keydown", (e) =>
    handleMovePrevProjectsPageThrottle(e, application),
  );

  const handleMoveNextProjectsPageThrottle = safeThrottle(
    (e, app) => handleMoveNextProjectsPage(e, app),
    showErrorModal,
    KEYPRESS_THROTTLE_TIME,
  );
  nextPageBtn.addEventListener("click", (e) =>
    handleMoveNextProjectsPageThrottle(e, application),
  );
  nextPageBtn.addEventListener("keydown", (e) =>
    handleMoveNextProjectsPageThrottle(e, application),
  );
}
