  // URL base del servidor
  const baseURL = "http://localhost:3000";

  // Elementos del DOM
  const libroForm = document.getElementById("libroForm");
  const libroIdInput = document.getElementById("libroId");
  const libroTitleInput = document.getElementById("libroTitle")
  const libroAutorInput = document.getElementById("libroAutor");
  const librosTableBody = document.getElementById("librosTableBody");
  const saveBtn = document.getElementById("saveBtn");
  const updateBtn = document.getElementById("updateBtn");

  let librosData = [];

  async function fetchLibros() {
    const response = await fetch(`${baseURL}/libros`);
    librosData = await response.json();
    librosTableBody.innerHTML = "";

      librosData.forEach((libro) => {
        const row = document.createElement("tr");
        row.innerHTML = `
              <td>${libro.titulo}</td>
              <td>${libro.autor}</td>
              <td>
                  <button onclick="editarLibro('${libro._id}')">Editar</button>
                  <button onclick="eliminarLibro('${libro._id}')">Eliminar</button>
              </td>
            `;
        librosTableBody.appendChild(row);
      });
  }

  async function createLibro() {
      const titulo = libroTitleInput.value;  
      const autor = libroAutorInput.value;  
      const libro = {titulo, autor};

      await fetch(`${baseURL}/libros`, {  
        method: "POST",  
        headers:{ 
          "Content-Type": "application/json", 
          Authorization: "miTokenSecreto123",   
        },  
        body: JSON.stringify(libro),
      });

      libroForm.reset();  
      fetchLibros();  
    }

    async function updateLibro() {
      const id = libroIdInput.value;  
      const titulo = libroTitleInput.value; 
      const autor = libroAutorInput.value;  
      const libro = { titulo, autor };

      await fetch(`${baseURL}/libros/${id}`, {  
        method: "PUT",  
        headers: {"Content-Type": "application/json", Authorization: "miTokenSecreto123",},  
        body: JSON.stringify(libro),  
      });  

      libroForm.reset();  
    libroIdInput.value = ""; 
    saveBtn.style.display = "inline-block";  
    updateBtn.style.display = "none";
    fetchLibros();  
  }

  function editarLibro(id) {
    const libro = librosData.find((libro) => libro._id === id); 
    libroIdInput.value = libro._id;  
    libroTitleInput.value = libro.titulo;  
    libroAutorInput.value = libro.autor; 

    saveBtn.style.display = "none";  
    updateBtn.style.display = "inline-block"; 
  }

  async function eliminarLibro(id) { 
    await fetch(`${baseURL}/libros/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "miTokenSecreto123",
      },
    });
    fetchLibros();
  }
  
  updateBtn.addEventListener("click", updateLibro);
  updateBtn.addEventListener("click", createLibro);    
    
  fetchLibros();

