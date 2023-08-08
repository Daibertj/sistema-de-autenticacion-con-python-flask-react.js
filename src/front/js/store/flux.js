const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      token: localStorage.getItem("token") || null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      registerUser: async (user) => {
        const store = getStore();
        try {
          let response = await fetch(`${process.env.BACKEND_URL}/user`, {
            method: "POST",
            body: user,
          });

          let data = await response.json();
          return response.status;
        } catch (error) {
          console.log("Error registering user:", error);
          return 500;
        }
      },

      login: async (body) => {
        const store = getStore();

        try {
          let response = await fetch(`${process.env.BACKEND_URL}/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          });

          let data = await response.json();
          setStore({
            token: data.token,
          });

          localStorage.setItem("token", data.token);
          return response.status;
        } catch (error) {
          return response.status;
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");

        setStore({ token: null, name: "", image: "" });
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
