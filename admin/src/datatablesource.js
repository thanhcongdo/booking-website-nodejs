export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "Người dùng",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },

  {
    field: "country",
    headerName: "Quốc gia",
    width: 100,
  },
  {
    field: "city",
    headerName: "Thành phố",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Điện thoại",
    width: 150,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Tên Khách sạn",
    width: 300,
  },
  {
    field: "type",
    headerName: "Loại",
    width: 100,
  },
  {
    field: "title",
    headerName: "Tên",
    width: 230,
  },
  {
    field: "city",
    headerName: "Thành Phố",
    width: 150,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Tên",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Mô tả",
    width: 200,
  },
  {
    field: "price",
    headerName: "Giá",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Số người",
    width: 100,
  },
];
