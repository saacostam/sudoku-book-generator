import { UpdateProgressBar } from "../types";

export const buildProgressBar = (): [HTMLProgressElement, UpdateProgressBar] => {
    const PROGRESS_BAR_MAX_VALUE = 100;

    const progressBar = document.createElement('progress');
    progressBar.className = 'progress-bar';
    progressBar.value = 0;
    progressBar.max = PROGRESS_BAR_MAX_VALUE;

    /**
     * 
     * @param progress Progress value from 0 to 1. If number out of range, the value is hard clamped.
     */
    const updateProgressBar = (progress: number) => {
        const clearnProgressValue = Math.max(0, Math.min(progress, 1));
        progressBar.value = clearnProgressValue * PROGRESS_BAR_MAX_VALUE;
    }

    return [progressBar, updateProgressBar];
}
