import React, { useState } from "react";

const Day19 = () => {
  const [fields, setFields] = useState([]);

  const generateId = () => Date.now() + Math.random();

  const addField = () => {
    setFields([
      ...fields,
      {
        id: generateId(),
        label: "",
        type: "text",
        value: "",
        error: "",
      },
    ]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const validateField = (field) => {
    if (!field.value.trim()) return "This field is required";

    if (field.type === "email" && !field.value.includes("@")) {
      return "Invalid email format";
    }

    if (field.type === "password" && field.value.length < 6) {
      return "Password must be at least 6 characters";
    }

    return "";
  };

  const handleChange = (id, key, value) => {
    const updated = fields.map((field) => {
      if (field.id === id) {
        const updatedField = { ...field, [key]: value };
        updatedField.error = validateField(updatedField);
        return updatedField;
      }
      return field;
    });

    setFields(updated);
  };

  const handleSubmit = () => {
    let isValid = true;

    const validated = fields.map((field) => {
      const error = validateField(field);
      if (error) isValid = false;
      return { ...field, error };
    });

    setFields(validated);

    if (!isValid) {
      console.log("Form has errors");
      return;
    }

    const formData = validated.map(({ id, error, ...rest }) => rest);
    console.log("Form Data:", formData);
  };

  return (
    <div className="container">
      <h2>Dynamic Form Builder</h2>

      <button onClick={addField}>Add Field</button>

      {fields.map((field) => (
        <div key={field.id} className="field-card">
          <input
            type="text"
            placeholder="Label"
            value={field.label}
            onChange={(e) =>
              handleChange(field.id, "label", e.target.value)
            }
          />

          <select
            value={field.type}
            onChange={(e) =>
              handleChange(field.id, "type", e.target.value)
            }
          >
            <option value="text">Text</option>
            <option value="email">Email</option>
            <option value="password">Password</option>
          </select>

          <input
            type={field.type}
            placeholder="Enter value"
            value={field.value}
            onChange={(e) =>
              handleChange(field.id, "value", e.target.value)
            }
          />

          {field.error && <p className="error">{field.error}</p>}

          <button onClick={() => removeField(field.id)}>
            Remove
          </button>
        </div>
      ))}

      {fields.length > 0 && (
        <button onClick={handleSubmit}>Submit</button>
      )}
    </div>
  );
};

export default Day19;