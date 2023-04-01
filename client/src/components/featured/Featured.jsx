import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Vũng Tàu,Nha Trang,Phú Quốc"
  );

  return (
    <div className="featured">
      {loading ? (
        "Đang tải..."
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://ik.imagekit.io/tvlk/blog/2022/07/bai-truoc-21-1024x514.jpg?tr=dpr-2,w-675"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Vũng Tàu</h1>
              <h2>{data[0]} chỗ nghỉ</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://reviewvilla.vn/wp-content/uploads/2022/06/bien-Da-Nang-2.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Nha Trang</h1>
              <h2>{data[1]} chỗ nghỉ</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://i1-dulich.vnecdn.net/2020/07/13/shutterstock-1312928729-baikhem-1594632095.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=ESB9auatlhDocyPlU_a9KA"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Phú Quốc</h1>
              <h2>{data[2]} chỗ nghỉ</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
