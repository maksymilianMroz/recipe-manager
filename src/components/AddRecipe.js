import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 20px auto;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Textarea = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  background: #ff6347;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const AddRecipe = ({ addRecipe }) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const isFormValid = title && summary && ingredients && instructions;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    addRecipe({
      id: Date.now(), // Temporary ID
      title,
      summary,
      ingredients,
      instructions,
    });
    setTitle("");
    setSummary("");
    setIngredients("");
    setInstructions("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <Textarea
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Summary"
      ></Textarea>
      <Textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Ingredients"
      ></Textarea>
      <Textarea
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        placeholder="Instructions"
      ></Textarea>
      <Button type="submit" disabled={!isFormValid}>
        Add Recipe
      </Button>
    </Form>
  );
};

export default AddRecipe;
