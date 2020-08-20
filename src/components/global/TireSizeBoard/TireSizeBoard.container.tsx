import TireSizeBoard from '~/components/global/TireSizeBoard/TireSizeBoard';
import { useSearchContext } from '~/components/modules/Search/Search.context';
import { useSearchModalContext } from '~/components/modules/Search/SearchModal.context';
export interface TireSizeBoardContainerProps {
  title: string;
}
export default function TireSizeBoardContainer({
  title,
}: TireSizeBoardContainerProps) {
  const {
    lockSearchStateToTireSize,
    lockSearchStateToVehicle,
  } = useSearchContext();
  const { setIsSearchOpen } = useSearchModalContext();
  const onVehicleInfoCTAClick = () => {
    lockSearchStateToVehicle();
    setIsSearchOpen(true);
  };
  const onTireSizeCTAClick = () => {
    lockSearchStateToTireSize();
    setIsSearchOpen(true);
  };
  return (
    <TireSizeBoard
      tireSizeBoardTitle={title}
      onVehicleInfoCTAClick={onVehicleInfoCTAClick}
      onTireSizeCTAClick={onTireSizeCTAClick}
    />
  );
}
