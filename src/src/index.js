window.renderChess = (...args) => {
    import('./chess').then(module => {
        module.renderChess(...args);
    });
};