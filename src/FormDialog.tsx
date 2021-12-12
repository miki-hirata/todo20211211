import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';


type Props = {
  text: string;
  dialogOpen: boolean;
  onSubmit: () => void;//return文を持たない関数の戻り値
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onToggleDialog: ()=> void;
};//propsでAppからもらってきたものたちを型エイリアスで定義
//HTML...系の記述って何なのでしょう

export const FormDialog = (props: Props) => {
  return (
    <Dialog fullWidth open={props.dialogOpen} onClose={props.onToggleDialog}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          props.onSubmit();
        }}
      >
        <div style={{ margin: '1em' }}>
          <TextField
            variant="standard"
            style={{
              width: '100%',
              fontSize: '16px',
              fontFamily:
                '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
            }}
            label="タスクを入力..."
            onChange={(e) => props.onChange(e)}
            value={props.text}
            autoFocus
          />
          <DialogActions>
            <Button color="secondary" onClick={props.onSubmit} aria-label="add">
              追加
            </Button>
          </DialogActions>
        </div>
      </form>
    </Dialog>
  );
};