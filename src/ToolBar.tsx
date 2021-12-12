import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';

type Props = {
  filter: Filter;//Filter型は別ファイルで定義しているよ
  onToggleDrawer: () => void;
};

export const ToolBar = (props: Props) => {
  
  //filter の書き換え用
  const translator = (arg: Filter) => {
    switch (arg) {
      case 'all':
        return 'すべてのタスク';
      case 'unchecked':
        return '現在のタスク';
      case 'checked':
        return '完了したタスク';
      case 'removed':
        return 'ごみ箱';
      default:
        return 'TODO';
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={props.onToggleDrawer}
            //sidebarを出す
          >
            <MenuIcon />
          </IconButton>
          <Typography>{translator(props.filter)}</Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};