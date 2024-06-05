import React from "react";
import styled, { css } from "styled-components";

const RecipeCard = styled.div`
  border: 1px solid #ccc;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button.attrs((props) => ({
  remove: props.remove || undefined,
}))`
  padding: 5px 10px;
  margin-right: 5px;
  background-color: ${(props) => (props.remove ? "#ff6347" : "#4caf50")};
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const RecipeItem = ({
  recipe,
  onEdit,
  onFavorite,
  onViewDetails,
  isFavorite,
}) => (
  <RecipeCard>
    <h2>{recipe.title}</h2>
    <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
    <Button onClick={() => onEdit(recipe)}>Edit</Button>
    <Button onClick={() => onViewDetails(recipe)}>View Details</Button>
    {isFavorite ? (
      <Button remove="true" onClick={() => onFavorite(recipe)}>
        Remove from Favorites
      </Button>
    ) : (
      <Button onClick={() => onFavorite(recipe)}>Add to Favorites</Button>
    )}
  </RecipeCard>
);

export default RecipeItem;
