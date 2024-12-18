import { useEffect, useState } from "react";
import { GetInfluencerService, GetStyleService, PostStyleService } from "@/services/api.service";
import { Card, CardHeader, CardBody, Typography } from "@material-tailwind/react";
import { StyleFormModal } from "@/components/StyleFormModal";
import { SyncLoader } from "react-spinners";


export function Style() {
  const [loading, setLoading] = useState(true);
  const [influencers, setInfluencers] = useState([]);
  const [styles, setStyles] = useState([]);

  const fetchAllStyles = async () => {
    setLoading(true);
    await GetStyleService()
      .then((res) => {
        setStyles(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const fetchAllInfluencers = async () => {
    await GetInfluencerService()
      .then((res) => {
        console.log(res);
        setInfluencers(res.data.data || []);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleStyleCreated = () => {
    fetchAllStyles(); // Refresh the styles list after a new style is created
  };

  useEffect(() => {
    fetchAllInfluencers();
    fetchAllStyles();
  }, []);

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Styles
            </Typography>
          </CardHeader>
          <div className="px-4 flex justify-end">
            <StyleFormModal
              btnText="Create Style"
              title="Create Style"
              influencers={influencers || []}
              onStyleCreated={handleStyleCreated}
            />
          </div>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            {loading ? (
              <Typography variant="small" className="text-blue-gray-600 text-center">
                <SyncLoader  size={8}  />
              </Typography>
            ) : (
              <table className="w-full min-w-[640px] table-auto min-h-[60vh]">
                <thead>
                  <tr>
                    {["name", "image", "influencers"].map((el) => (
                      <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                      >
                        <Typography
                          variant="small"
                          className="text-[11px] font-bold uppercase text-blue-gray-400"
                        >
                          {el}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {styles.map(({ name, image, influencerId, _id }, key) => {


                    const className = ` px-5 ${
                      key === styles.length - 1 ? "" : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={_id}>
                        <td className={className}>
                          <Typography variant="small" color="blue-gray" className="font-bold">
                            {name}
                          </Typography>
                        </td>
                        <td className={className}>
                          <img
                            src={image}
                            alt={name}
                            className="h-10 w-10 rounded-full"
                          />
                        </td>
                        <td className={className}>
                          <Typography variant="small" className="text-xs text-blue-gray-600">
                            {influencerId.length
                              ? influencerId.join(", ")
                              : "No Influencers"}
                          </Typography>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default Style;
