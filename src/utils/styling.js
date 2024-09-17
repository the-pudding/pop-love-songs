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
