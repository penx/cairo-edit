import { ControlGroup, Button } from '@modulz/design-system';

export const Toolbar = ({
  onSaveClick,
  onLoadClick,
  onResetClick,
  onExportClick
}: {
  onSaveClick: React.MouseEventHandler;
  onLoadClick: React.MouseEventHandler;
  onResetClick: React.MouseEventHandler;
  onExportClick: React.MouseEventHandler;
}) => (
  <ControlGroup>
    <Button onClick={onSaveClick}>Save</Button>
    <Button onClick={onLoadClick}>Load</Button>
    <Button onClick={onResetClick}>Reset</Button>
    <Button onClick={onExportClick}>Export</Button>
  </ControlGroup>
);
