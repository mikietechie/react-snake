import React from "react";
import { NavLink } from "react-router";
import { HOME_LINKS } from "../../shared/home-links";

export const HomePage: React.FC = () => {
  return (
    <div className="container">
      <div className="row">
        {HOME_LINKS.map((link, index) => (
          <div key={index} className="col-lg-4 col-md-6">
            <NavLink to="/snake-game" style={{ textDecoration: "none" }}>
              <div className="card">
                <img src="/games/thumbnails/snake.jpeg" alt="" />
                <div className="card-header">
                  <h2 className="card-title">{link.title}</h2>
                </div>
                <div className="card-body">
                  <p className="card-text">{link.description}</p>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};
