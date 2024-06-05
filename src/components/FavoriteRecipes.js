import React from "react";
import RecipeItem from "./RecipeItem";
import styled from "styled-components";

const EmptyMessage = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  margin: 20px 0;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  text-align: center;
`;

const FavoriteRecipes = ({
  favoriteRecipes,
  onEdit,
  onRemoveFavorite,
  onViewDetails,
}) => (
  <ListContainer>
    <Title>Favorite Recipes</Title>
    {favoriteRecipes.length === 0 ? (
      <EmptyMessage>The list is currently empty...</EmptyMessage>
    ) : (
      favoriteRecipes.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          recipe={recipe}
          onEdit={onEdit}
          onFavorite={onRemoveFavorite}
          onViewDetails={onViewDetails}
          isFavorite={true}
        />
      ))
    )}
  </ListContainer>
);

export default FavoriteRecipes;
