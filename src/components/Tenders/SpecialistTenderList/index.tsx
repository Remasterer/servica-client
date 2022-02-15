import { Stack } from '@mui/material';
import { useGetAllTendersQuery } from '@services';
import { SpecialistTenderCard } from './SpecialistTendersCard';

export const SpecialistTenderList = () => {
  const { data: responseData } = useGetAllTendersQuery({ limit: 5 });
  const tenders = responseData?.data.tenders;
  return (
    <Stack spacing={4} pt={2}>
      {tenders?.map((tender) => (
        <SpecialistTenderCard
          key={tender.id}
          id={tender.id}
          title={tender.title}
          description={tender.description}
          price={tender.price}
          services={tender.services}
          workers={tender.workers}
          endDate={tender.endDate}
        />
      ))}
    </Stack>
  );
};
