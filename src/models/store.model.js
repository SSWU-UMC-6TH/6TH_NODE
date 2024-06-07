let stores = [];

export const addStore = ({ name, location, description }) => {
    const newStore = {
        id: stores.length + 1,
        name,
        location,
        description
    };
    stores.push(newStore);
    console.log("addstore");
    return newStore;
};

export const getStoreById = (id) => {
    return stores.find(store => store.id === parseInt(id));
};