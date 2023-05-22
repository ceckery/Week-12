import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [entities, setEntities] = useState([]);
  const [name, setName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const addEntity = () => {
    if (name.trim() !== '') {
      const newEntity = {
        id: new Date().getTime().toString(),
        name: name.trim(),
      };
      setEntities([...entities, newEntity]);
      setName('');
    }
  };

  const deleteEntity = (id) => {
    setEntities(entities.filter((entity) => entity.id !== id));
  };

  const editEntity = (id) => {
    const entityToEdit = entities.find((entity) => entity.id === id);
    setName(entityToEdit.name);
    setEditMode(true);
    setEditId(id);
  };

  const updateEntity = () => {
    if (name.trim() !== '') {
      const updatedEntities = entities.map((entity) => {
        if (entity.id === editId) {
          return { ...entity, name: name.trim() };
        }
        return entity;
      });
      setEntities(updatedEntities);
      setName('');
      setEditMode(false);
      setEditId(null);
    }
  };

  return (
    <div className="container mt-5">
      <h1>CRUD Application</h1>
      <div className="row mt-5">
        <div className="col-md-6">
          <h2>Add Entity</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <button className="btn btn-primary" onClick={editMode ? updateEntity : addEntity}>
            {editMode ? 'Update' : 'Add'}
          </button>
        </div>
        <div className="col-md-6">
          <h2>Entities</h2>
          <ul className="list-group">
            {entities.map((entity) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={entity.id}>
                {entity.name}
                <div>
                  <button className="btn btn-warning mr-2" onClick={() => editEntity(entity.id)}>
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => deleteEntity(entity.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
