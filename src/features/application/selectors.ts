import {AppRootState} from "../../utils/types"

export const selectStatus = (state: AppRootState) => state.application.status
export const selectIsInitialized = (state: AppRootState) => state.application.isInitialized