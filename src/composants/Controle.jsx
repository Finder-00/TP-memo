import './Controle.scss';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import * as crudTaches from '../services/crud-taches';

export default function Controle({etatTaches, utilisateur, completee, setValeurBouton, supprimerToutesTaches, idTache}) {

const [taches, setTaches] = etatTaches;
const uid = utilisateur.uid;


  // supprimer les taches completee
  function supprimerToutesTaches(idTache){
    crudTaches.supprimerTout(uid, idTache, completee).then(
      () => {
        setTaches(taches.filter(task => {
          return task.completee == false
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
        <ToggleButton value={'toutes'} onClick={() => setValeurBouton('toutes')}>Toutes</ToggleButton>
        <ToggleButton value={true} onClick={() => setValeurBouton(true)}>Complétées</ToggleButton>
        <ToggleButton value={false} onClick={() => setValeurBouton(false)}>Actives</ToggleButton>
      </ToggleButtonGroup>
      <span className="compte">
        {taches.length} tâches restantes
      </span>
      <IconButton 
        aria-label="delete"
        size="small" 
        variant="contained" 
        color="secondary"
        onClick = {() => supprimerToutesTaches(idTache)}
        title="Supprimer les tâches complétées"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </footer>
  );
}