import { Button } from './MoveCurrentLocation.style.ts';

import ActiveMoveLocationIcon from '@/assets/icons/map/active-move-location-icon.svg?react';
import NonActiveMoveLocationIcon from '@/assets/icons/map/non-active-move-location-icon.svg?react';

interface MoveCurrentLocationButtonProps {
  moveCurrentLocationFunc: () => void;
  isActiveMyLocationButton: boolean;
  isActivePartyItem: string | null;
  partyListHeight: number;
}

const windowHeight = window.innerHeight;
const MoveCurrentLocationButton = ({
  moveCurrentLocationFunc,
  isActiveMyLocationButton,
  isActivePartyItem,
  partyListHeight,
}: MoveCurrentLocationButtonProps) => {
  return (
    <Button
      onClick={moveCurrentLocationFunc}
      $bottom={partyListHeight}
      $isMax={partyListHeight >= Math.floor(windowHeight * 0.9)}
      $activeMarker={isActivePartyItem}
    >
      {isActiveMyLocationButton ? (
        <ActiveMoveLocationIcon />
      ) : (
        <NonActiveMoveLocationIcon />
      )}
    </Button>
  );
};

export default MoveCurrentLocationButton;
