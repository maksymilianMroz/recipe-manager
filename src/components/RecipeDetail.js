import React from "react";
import styled from "styled-components";

const DetailContainer = styled.div`
  padding: 1rem;
`;

const RecipeDetail = ({ recipe }) => (
  <DetailContainer>
    <h2>{recipe.title}</h2>
    <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
    <p>
      <strong>Ingredients:</strong> {recipe.ingredients}
    </p>
    <p>
      <strong>Instructions:</strong> {recipe.instructions}
    </p>
  </DetailContainer>
);

export default RecipeDetail;
