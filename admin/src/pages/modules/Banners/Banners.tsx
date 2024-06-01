/** @format */

import { Button } from '@/components';
import { useModal } from '@/hooks/useModal';
import { Loader2, Plus, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useQuery } from '@tanstack/react-query';
import { ESetting } from '@/types/app';
import { useBanner } from '@/hooks/useBanners';
import { BannersAddModal } from './Modals/BannersAddModal';
import { BannersDeleteModal } from './Modals/BannersDeleteModal';
import { Tooltip } from '@nextui-org/react';

export const Banners = () => {
  const { onOpenDeleteModal, onOpenAddModal, modal } = useModal();
  const { onGetBanners, onUpdateBannerIndices } = useBanner();
  const [loading, setLoading] = useState(false);
  const [loaderClass, setLoaderClass] = useState('opacity-0');

  const { data, refetch } = useQuery({
    queryKey: [ESetting.banners],
    queryFn: () => onGetBanners(),
  });
  const [tempData, setTempData] = useState<any>([]);
  useEffect(() => {
    // console.log(data)
    setTempData(data);
    setLoading(false);
  }, [data]);
  const handleOnDragEnd = result => {
    if (!result.destination || !result.source || result.destination.index == result.source.index) {
      return;
    }

    // set the args here before we shuffle things around
    const updateArgs = {
      id: tempData[result.source.index].id,
      from: tempData[result.source.index].bannerIndex,
      to: result.destination.index + 1,
      callback: () => {
        // refetch();
      },
    };

    let reorderedData = JSON.parse(JSON.stringify(tempData));

    reorderedData[result.source.index] = null;
    reorderedData = reorderedData.filter(value => value !== null);
    reorderedData.splice(result.destination.index, 0, tempData[result.source.index]);
    reorderedData = reorderedData.map((item: any, index) => {
      const oneBasedIndex = index + 1;
      item.bannerIndex = oneBasedIndex;
      return item;
    });

    setTempData(reorderedData);

    setLoading(true);
    onUpdateBannerIndices(updateArgs).finally(() => {
      refetch();
    });
  };

  const handleDelete = bannerId => {
    onOpenDeleteModal({ id: bannerId });
  };

  useEffect(() => {
    setLoaderClass(loading ? 'opacity-50' : 'opacity-0 pointer-events-none');
  }, [loading]);

  return (
    <div className='relative w-[98%] mt-6 h-full m-0 p-0 select-none'>
      <h1 className='mt-6 mx-2 text-xl mb-4 font-medium '>
        Banner - trang trí cho văn phòng của bạn{' '}
      </h1>
      <div className='fixed right-2 bottom-8 z-50 flex items-center justify-center'>
        <Button
          className='rounded-full w-16 h-16 bg-white transition ease-in-out hover:scale-110 origin-center hover:rotate-180 duration-300 shadow-md hover:bg-white'
          onClick={() => {
            onOpenAddModal();
          }}
        >
          <Plus className='text-slate-800' />
        </Button>
      </div>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId='droppable' direction='vertical'>
          {provided => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='flex flex-col overflow-y-auto overflow-x-clip h-full px-2'
              style={
                {
                  // display: 'flex',
                  // flexDirection: 'column',
                  // overflowX: 'auto',
                  // alignItems: 'start',
                  // height: '100%', // ensure it takes full height
                }
              }
            >
              {tempData?.map((banner: any, i) => (
                <Draggable key={`${i}`} draggableId={`${i}`} index={i}>
                  {provided => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className='flex p-2 h-60 border-1 shadow-sm rounded-lg m-2 bg-slate-100 transition-[background-color,box-shadow] hover:bg-white active:bg-white active:shadow-lg'
                      style={{
                        ...provided.draggableProps.style,
                        // margin: '0 ',
                        // width: '90%',
                        // height: '180px',
                        // flexShrink: 0, // ensure flex items don't shrink
                      }}
                    >
                      <div className='w-full h-56'>
                        <div className='w-full relative'>
                          <img
                            src={banner?.anhBanner}
                            alt={banner?.title}
                            className={`w-full absolute h-56 shrink-0 rounded-md object-cover aspect-video`}
                          />
                          <div className='h-12 w-12 text-center p-2 pt-3 justify-between absolute -top-6 -left-6 bg-white rounded-full text-slate-800 shadow-md font-bold'>
                            {banner.bannerIndex}
                          </div>
                          <Tooltip
                            color={'danger'}
                            className='capitalize font-medium'
                            content='Xóa banner'
                          >
                            <Button
                              onClick={() => handleDelete(banner.id)}
                              className='absolute rounded-md h-12 w-12 top-40 right-4 bg-white shadow-sm transition ease-in-out hover:scale-105 hover:bg-white' // You can style the button as you like
                            >
                              <Trash className='w-4 h-4 text-slate-800' />
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {
        <div
          className={
            loaderClass +
            ' transition-opacity fixed flex align-start justify-center top-0 bottom-0 left-0 right-0 bg-black z-[100] mt-[8rem] lg:mt-0'
          }
        >
          <div className='m-auto'>
            <Loader2 className='animate-spin text-white w-20 h-20' />
          </div>
        </div>
      }

      {modal?.addModal ? <BannersAddModal keyName={ESetting.banners} refetch={refetch} /> : null}
      <BannersDeleteModal />
    </div>
  );
};
