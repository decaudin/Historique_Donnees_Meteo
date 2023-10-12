import "./Banner.scss";
import { Link } from "react-router-dom";

const Banner = () => {


    return (
        <div className="banner">
            <div className="sitePresentation">
                <h3>Bonjour et bienvenue sur ce site consacré aux données météo.</h3>
                <p>Vous pourrez y retrouver un historique de l'année 2000 à nos jours de quatre types de données climatiques (températures, vent, ensoleillement et précipitations) pour plusieurs villes françaises. Je précise que ces données sont issues du site infoclimat et qu'une seule station météo sélectionnée de façon arbitraire a été retenue pour chaque ville.</p>
                <p>Ce site comporte trois outils et est donc divisé en trois parties : un comparatif entres villes, des données pour une ville et l'évolution du climat pour une ville.</p>
                <p>Le premier outil vous permettra d'établir un classement entre les différentes villes référencées selon les critères de votre choix et la période choisie (jour, mois ou année).</p>
                <p>Le second outil vous permettra d'obtenir l'ensemble des données relatives à la ville sélectionnée pour la période de votre choix (jour, mois, année).</p>
                <p>Le troisième outil vous permettra de voir l'évolution du climat pour une ville selon les critères de votre choix.</p>
            </div>
            <div className="button">
                <Link to="/Compare"><button className="compareButton">Comparer</button></Link>
                <Link to="/City"><button className="city">Données par ville</button></Link>
                <Link to="/Evolution"><button className="evolution">Évolution climat</button></Link>
            </div>
        </div>
    )
}

export default Banner;

