export const headerSidebar = {
    open: (height = 600) => ({
        clipPath: `circle(${height * 2 + 200}px at 90% 2%)`,
        transition: {
            type: 'spring',
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: {
        clipPath: 'circle(40px at 90% 5%)',
        transition: {
            delay: 0.5,
            type: 'spring',
            stiffness: 400,
            damping: 40,
        },
    },
};

export const list = {
    visible: (i = 1) => ({
        opacity: 1,
        transition: {
            duration: 0.3,
            when: 'beforeChildren',
            staggerChildren: 0.3 * i,
            ease: 'easeInOut',
        },
    }),
    hidden: {
        opacity: 0,
        transition: {
            when: 'afterChildren',
        },
    },
};


export const revealMenu = {
    visible: {
        y: 0,
        zIndex: 999,
        transition: {
            duration: 1,
            when: 'beforeChildren',
            staggerChildren: 0.3,
        },
    },
    hidden: {
        y: '-100vh',
        zIndex: -1,
        transition: {
            duration: 1,
            when: 'afterChildren',
        },
    },
};

export const mobileHeaderAni = {
    hidden: {
        opacity: 0,
        x: 150,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
};

export const toDown = {
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
    hidden: {
        opacity: 0,
        y: -50,
        transition: {
            duration: 1,
        },
    },
};
export const toUp = {
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,
        },
    },
    hidden: {
        opacity: 0,
        y: 50,
        transition: {
            duration: 1,
        },
    },
};

export const toRight = {
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1,
        },
    },
    hidden: {
        opacity: 0,
        x: -100,
        transition: {
            duration: 1,
        },
    },
};

export const toLeft = {
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 1,
            ease: 'easeInOut',
        },
    },
    hidden: {
        opacity: 0,
        x: 100,
        transition: {
            duration: 1,
        },
    },
};

export const popUp = {
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1.5,
            ease: 'easeOut',
            type: 'spring',
            damping: 8,
        },
    },
    hidden: {
        opacity: 0,
        scale: 0.5,
        transition: {
            duration: 1,
        },
    },
};

export const beaver = {
    visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            duration: 1,
            delay: 2,
        },
    },
    hidden: {
        opacity: 0,
        y: 125,
        x: 75,
        transition: {
            duration: 1,
        },
    },
};

export const opacity = {
    visible: {
        opacity: 1,
        transition: {
            duration: 1,
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            duration: 1,
        },
    },
};

export const toggleHeight = {
    visible: {
        height: 'auto',
        opacity: 1,
        marginTop: '2rem',
        transition: {
            height: {
                duration: 0.4,
            },
            opacity: {
                duration: 0.25,
                delay: 0.15,
            },
        },
    },
    hidden: {
        height: 0,
        opacity: 0,
    },
    exit: {
        marginTop: 0,
        height: 0,
        opacity: 0,
        transition: {
            height: {
                duration: 0.4,
            },
            opacity: {
                duration: 0.15,
            },
            marginTop: {
                duration: 0.25,
            },
        },
    },
};

export const pageAnimation = {
    initial: { x: `${Math.floor(Math.random() * (100 - -100 + 1) + -100)}vw`, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: `${Math.floor(Math.random() * (100 - -100 + 1) + -100)}vw`, opacity: 0 },
    transition: { duration: 1, ease: 'easeInOut' },
};

// TEXT ANIMATIONS

export const textFromTop = {
    hidden: {
        opacity: 0,
        y: -20,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
};

export const textFromTopRight = {
    hidden: {
        opacity: 0,
        y: -20,
        x: 20,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
    visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
};
export const textFromRight = {
    hidden: {
        opacity: 0,
        x: 20,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
};
export const textFromBottomRight = {
    hidden: {
        opacity: 0,
        y: 20,
        x: 20,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
    visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
};

export const textFromBottom = {
    hidden: {
        opacity: 0,
        y: 20,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
};

export const textFromBottomLeft = {
    hidden: {
        opacity: 0,
        y: 20,
        x: -20,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
    visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
};
export const textFromLeft = {
    hidden: {
        opacity: 0,
        x: -20,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
};
export const textFromTopLeft = {
    hidden: {
        opacity: 0,
        y: -20,
        x: -20,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
    visible: {
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
            type: 'spring',
            damping: 12,
            stiffness: 100,
        },
    },
};
