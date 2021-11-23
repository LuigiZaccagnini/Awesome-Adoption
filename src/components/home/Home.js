import React from "react";
import { Button, Image, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Dog from "./dog.jpg";
import "./home.css";
import PetCard, {
  // PetCard,
  PetCardLoading,
} from "../layout/PetCard";
import { usePetAuth } from "../../context/TokenContext";
import useFetch from "../../useHooks/useFetch";
import LoaderComponent from "../../utils/LoaderComponent";

export default function Home() {
  const { tokenHeaders } = usePetAuth();

  const randomThreePets =
    "https://api.petfinder.com/v2/animals?limit=3&sort=random";
  const { data, isLoading, serverError } = useFetch(
    randomThreePets,
    tokenHeaders
  );

  return (
    <div className="home__container">
      <Image src={Dog} alt="doggo" roundedCircle className="shadow" id="dog" />
      <h2>Adopt a Buddy Today!</h2>
      <Button as={Link} to="/pets" variant="primary">
        Adopt
      </Button>
      <div className="featured__pets">
        <h2>Featured Pets</h2>
        <Container>
          <Row>
            <LoaderComponent
              isLoading={isLoading}
              serverError={serverError}
              spinner={<PetCardLoading />}
            >
              {data &&
                data.animals.map((pet) => <PetCard key={pet.id} pet={pet} />)}
            </LoaderComponent>
          </Row>
        </Container>
      </div>
    </div>
  );
}
