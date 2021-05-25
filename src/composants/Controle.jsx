import './Controle.scss';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import * as crudTaches from '../services/crud-taches';
import { useEffect, useState } from 'react';

export default function Controle({etatTaches, utilisateur, completee, setToggleButton, AfficheCompl, supprimerToutesTaches, idColl}) {

  const [taches, setTaches] = etatTaches;
  const uid = utilisateur.uid;


const gestionValeur = (e) =>{
  console.log(e.target.value);
  setToggleButton(e.target.value);
}

  // affiche les taches completee
  function AfficheCompl(completee){
    crudTaches.lireTout(uid).then(
      () => {
        console.log(setToggleButton.value);
        setTaches(taches.filter(task => {
          if(ToggleButton.value == true){
            return task.completee === true;
          }
          else if(ToggleButton.value == false){
            return task.completee !== completee;
          }
          else if(ToggleButton.value == 'toutes'){
            return true;
          }
        }))
      }
    )
  }

  // affiche les taches incomplete
  function AfficheIncomplete(completee){
    crudTaches.lireTout(uid).then(
      () => {
        setTaches(taches.filter(task => {
          return task.completee !== completee;
        }))
      }
    )
  }

  // supprimer les taches completee
  function supprimerToutesTaches(idColl){
    crudTaches.supprimerTout(uid, idColl, completee).then(
      () => {
        setTaches(taches.filter(task => {
          return task.id !== idColl
        }))
      }
    )
  }

  return (
    <footer className="Controle">
      <ToggleButtonGroup 
        size="small" 
        exclusive={true} 
      >
        {/* crudTaches.lireTout(utilisateur.uid) */}
        <ToggleButton value={'toutes'} onClick={AfficheCompl}>Toutes</ToggleButton>
        <ToggleButton value={true} onClick={AfficheCompl}>Complétées</ToggleButton>
        <ToggleButton value={false} onClick={gestionValeur}>Actives</ToggleButton>
      </ToggleButtonGroup>
      <span className="compte">
        {taches.length} tâches restantes
      </span>
      <IconButton 
        aria-label="delete"
        size="small" 
        variant="contained" 
        color="secondary"
        onClick = {() => supprimerToutesTaches(idColl)}
        title="Supprimer les tâches complétées"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </footer>
  );
}