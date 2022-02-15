import { ClientTenderCard, TenderModal } from '@components';
import { useAppSelector, useModalState } from '@hooks';
import { Stack } from '@mui/material';
import { useGetAllTendersQuery } from '@services';
import { getLeftTime } from '@utils';
import Pagination from '@mui/material/Pagination';
import { useState, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DashboardPage from '../index';

const PostedTendersPage = () => {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const [page, setPage] = useState<number>(1);

  const { data: responseData } = useGetAllTendersQuery(
    {
      user: userId,
      limit: 10,
      page,
      fields: 'id,title,endDate,price,description',
      sort: '-createdAt'
    },
    { skip: !userId }
  );
  const numberOfResult = responseData?.data.tenders.length;

  const [openModal, editModalMode, handleOpenModal, handleCloseModal] = useModalState();
  const [editTenderId, setEditTenderId] = useState<string | null>(null);

  const handleEditTender = (id: string) => {
    setEditTenderId(id);
    handleOpenModal(true);
  };

  useEffect(() => {
    if (numberOfResult === 0) {
      setPage((prevState) => prevState - 1);
    }
  }, [numberOfResult]);

  return (
    <DashboardPage>
      <Stack spacing={2}>
        <Fab
          color="secondary"
          aria-label="Add new tender"
          variant="extended"
          sx={{ width: '190px', alignSelf: 'flex-end' }}
          onClick={() => handleOpenModal()}>
          <AddIcon sx={{ mr: 1 }} />
          Add new tender
        </Fab>
        {responseData?.data.tenders.map((tender) => {
          const daysLeft = tender.endDate && getLeftTime(tender.endDate);

          return (
            <ClientTenderCard
              key={tender.id}
              id={tender.id}
              title={tender.title}
              endTime={daysLeft}
              price={tender.price}
              description={tender.description}
              handleEdit={handleEditTender}
            />
          );
        })}

        {(responseData?.results || 0) > 10 && (
          <Pagination
            page={page}
            count={Math.ceil((responseData?.results || 10) / 10)}
            shape="rounded"
            onChange={(event, newPage) => setPage(newPage)}
          />
        )}
      </Stack>
      <TenderModal
        open={openModal}
        handleCloseDialog={handleCloseModal}
        editMode={editModalMode}
        editTenderId={editTenderId}
      />
    </DashboardPage>
  );
};

export default PostedTendersPage;
