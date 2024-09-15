export const textShadow = (x, y, blur, color) => `
    ${x}px ${y}px ${blur}px ${color},
    ${-x}px ${-y}px ${blur}px ${color},
    ${x}px ${-y}px ${blur}px ${color},
    ${-x}px ${y}px ${blur}px ${color},
    ${x}px 0px ${blur}px ${color},
    ${-x}px 0px ${blur}px ${color},
    0px ${y}px ${blur}px ${color},
    0px ${-y}px ${blur}px ${color}
`;
