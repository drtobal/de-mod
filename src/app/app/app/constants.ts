/** CSS animation function for entering elements */
export const DECELERATION_CURVE_TIMING_FUNCTION = 'cubic-bezier(0, 0, 0.2, 1)';

/** CSS animation function for a standard animation */
export const STANDARD_CURVE_TIMING_FUNCTION = 'cubic-bezier(0.4, 0, 0.2, 1)';

/** CSS animation function for exiting elements */
export const ACCELERATION_CURVE_TIMING_FUNCTION = 'cubic-bezier(0.4, 0, 1, 1)';

/** CSS animation function for another type of animations */
export const SHARP_CURVE_TIMING_FUNCTION = 'cubic-bezier(0.4, 0, 0.6, 1)';

/** CSS timing to use in any animation */
export const TRANSITION_DURATION_COMPLEX = 375;

/** CSS timing to use in any animation with entering elements */
export const TRANSITION_DURATION_ENTERING = 225;

/** CSS timing to use in any animation with exiting elements */
export const TRANSITION_DURATION_EXITING = 195;

/** Standar css type of enter animation */
export const TRANSITION_ENTER = `${TRANSITION_DURATION_ENTERING}ms ${DECELERATION_CURVE_TIMING_FUNCTION}`;

/** Standar css type of exit animation */
export const TRANSITION_EXIT_PERMANENT = `${TRANSITION_DURATION_EXITING}ms ${ACCELERATION_CURVE_TIMING_FUNCTION}`;