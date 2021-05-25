import './Controle.scss';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import * as crudTaches from '../services/crud-taches';

export default function Controle({etatTaches, utilisateur, completee, AfficheCompl, supprimerToutesTaches, idColl}) {

  const [taches, setTaches] = etatTaches;
  const uid = utilisateur.uid;


  // affiche les taches completee
  function AfficheCompl(completee){
    crudTaches.lireTout(uid).then(
      () => {
        setTaches(taches.filter(task => {
          return task.completee === true;
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
        <ToggleButton value={'toutes'} onClick = {() => crudTaches.lireTout(utilisateur.uid)}>Toutes</ToggleButton>
        <ToggleButton value={true} onClick = {() => AfficheCompl(completee)}>Complétées</ToggleButton>
        <ToggleButton value={false} onClick = {() => AfficheIncomplete(!completee)}>Actives</ToggleButton>
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