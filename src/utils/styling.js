export const textShadow = (offset, blur, color) => `
    ${offset}px ${offset}px ${blur}px ${color},
    ${-offset}px ${-offset}px ${blur}px ${color},
    ${offset}px ${-offset}px ${blur}px ${color},
    ${-offset}px ${offset}px ${blur}px ${color},
    ${offset}px 0px ${blur}px ${color},
    ${-offset}px 0px ${blur}px ${color},
    0px ${offset}px ${blur}px ${color},
    0px ${-offset}px ${blur}px ${color}
`;
