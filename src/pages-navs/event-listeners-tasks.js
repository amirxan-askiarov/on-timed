import _ from "lodash";
import { getTasksBarFooterNodes } from "./static-selectors";
import {
  handleMovePrevTasksPage,
  handleMoveNextTasksPage,
} from "./tasks-handlers";
import { KEYPRESS_THROTTLE_TIME, safeThrottle, showErrorModal } from "../utils";

export function addListenersTasksPagesNav(application) {
  const { prevPageBtn, nextPageBtn } = getTasksBarFooterNodes();

  const handleMovePrevTasksPageThrottle = safeThrottle(
    (e, app) => handleMovePrevTasksPage(e, app),
    showErrorModal,
    KEYPRESS_THROTTLE_TIME,
  );

  prevPageBtn.addEventListener("click", (e) =>
    handleMovePrevTasksPageThrottle(e, application),
  );
  prevPageBtn.addEventListener("keydown", (e) =>
    handleMovePrevTasksPageThrottle(e, application),
  );

  const handleMoveNextTasksPageThrottle = safeThrottle(
    (e, app) => handleMoveNextTasksPage(e, app),
    showErrorModal,
    KEYPRESS_THROTTLE_TIME,
  );

  nextPageBtn.addEventListener("click", (e) =>
    handleMoveNextTasksPageThrottle(e, application),
  );
  nextPageBtn.addEventListener("keydown", (e) =>
    handleMoveNextTasksPageThrottle(e, application),
  );
}
