import './Controle.scss';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Controle({etatTaches, utilisateur, supprimerToutesTaches, idColl}) {
  const [taches] = etatTaches;

  return (
    <footer className="Controle">
      <ToggleButtonGroup 
        size="small" 
        exclusive={true} 
      >
        <ToggleButton value={'toutes'}>Toutes</ToggleButton>
        <ToggleButton value={true}>Complétées</ToggleButton>
        <ToggleButton value={false}>Actives</ToggleButton>
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