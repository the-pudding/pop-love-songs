import variables from "$data/variables.json";

export const textShadow = (
	offset,
	blur,
	color = variables.color["cream-background"]
) => `
    ${offset}px ${offset}px ${blur}px ${color},
    ${-offset}px ${-offset}px ${blur}px ${color},
    ${offset}px ${-offset}px ${blur}px ${color},
    ${-offset}px ${offset}px ${blur}px ${color},
    ${offset}px 0px ${blur}px ${color},
    ${-offset}px 0px ${blur}px ${color},
    0px ${offset}px ${blur}px ${color},
    0px ${-offset}px ${blur}px ${color}
`;


export const tiemposFriendlyTextShadow = (
	color = variables.color["cream-background"]
) => `
    -3px -3px 1px ${color},
    -3px -2px 1px ${color},
    -3px -1px 1px ${color},
    -3px 0px 1px ${color},
    -3px 1px 1px ${color},
    -3px 2px 1px ${color},
    -3px 3px 1px ${color},
    -2px -3px 1px ${color},
    -2px -2px 1px ${color},
    -2px -1px 1px ${color},
    -2px 0px 1px ${color},
    -2px 1px 1px ${color},
    -2px 2px 1px ${color},
    -2px 3px 1px ${color},
    -1px -3px 1px ${color},
    -1px -2px 1px ${color},
    -1px -1px 1px ${color},
    -1px 0px 1px ${color},
    -1px 1px 1px ${color},
    -1px 2px 1px ${color},
    -1px 3px 1px ${color},
    0px -3px 1px ${color},
    0px -2px 1px ${color},
    0px -1px 1px ${color},
    0px 1px 1px ${color},
    0px 2px 1px ${color},
    0px 3px 1px ${color},
    1px -3px 1px ${color},
    1px -2px 1px ${color},
    1px -1px 1px ${color},
    1px 0px 1px ${color},
    1px 1px 1px ${color},
    1px 2px 1px ${color},
    1px 3px 1px ${color},
    2px -3px 1px ${color},
    2px -2px 1px ${color},
    2px -1px 1px ${color},
    2px 0px 1px ${color},
    2px 1px 1px ${color},
    2px 2px 1px ${color},
    2px 3px 1px ${color},
    3px -3px 1px ${color},
    3px -2px 1px ${color},
    3px -1px 1px ${color},
    3px 0px 1px ${color},
    3px 1px 1px ${color},
    3px 2px 1px ${color},
    3px 3px 1px ${color}
    `;