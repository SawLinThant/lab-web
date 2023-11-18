import {
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import DetailsRow from "./DetailsRow";
import labResultFormAtom from "../recoil/labResultForm";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAxios } from "../hooks";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SettingsOverscanIcon from "@mui/icons-material/SettingsOverscan";
import { useNavigate } from "react-router-dom";
import LetterHead from "./LetterHead";
import capitalize from "../utils/capitalize";
import padZero from "../utils/padZero";
import logoAtom from "../recoil/logo/atom";
import stampAtom from "../recoil/stamp/atom";
import MyLabLogo from "./MyLabLogo";
import Contact from "./Contact";
import backgroundAtom from "../recoil/backgroundImage/atom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
// import EditIcon from "@mui/icons-material/Edit";
// import SaveIcon from "@mui/icons-material/Save";

const footerLogo = {
  width: "60%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
};

const LabResultPreview = (
  {
    height,
    isPreview = true,
    data,
    refreshData,
    enableDelete = false,
    isPrintMode = false,
  },
  ref
) => {
  // const [isEditMode, setIsEditMode] = useState(false);
  const api = useAxios({ autoSnackbar: true });
  const navigate = useNavigate();
  const { labReport, labResult } = data;
  const [testList, setTestList] = useState([]);
  const [labResultForm, setLabResultForm] = useRecoilState(labResultFormAtom);
  const resetLabResultForm = useResetRecoilState(labResultFormAtom);
  const logoState = useRecoilValue(logoAtom);
  const stampState = useRecoilValue(stampAtom);
  const backgroundState = useRecoilValue(backgroundAtom);

  const deleteParameter = async (id) => {
    const res = await api.delete(`/api/lab_reports/result/${id}`);
    if (res.status === 200) {
      refreshData();
      resetLabResultForm();
    }
    return;
  };

  const removeDuplicateObjectFromArray = (array, key) => {
    let check = new Set();
    return array.filter((obj) => !check.has(obj[key]) && check.add(obj[key]));
  };

  useEffect(() => {}, logoState);
  useEffect(() => {}, backgroundState);

  useEffect(() => {
    if (labResult) {
      const tl = [
        ...removeDuplicateObjectFromArray(
          labResult.map((lr) => {
            return {
              test_name: lr?.test_name,
              test_id: lr?.test_id,
              test: lr?.test,
            };
          }),
          "test_name"
        ),
      ];
      setTestList(tl);
    }
    return () => resetLabResultForm();
    // eslint-disable-next-line
  }, [labResult]);

  return (
    <>
      {isPreview && (
        <Box display="flex" alignItems="center">
          <Typography variant="h6">
            {/* {isEditMode ? "Edit" : "Preview"} */}
            Preview
          </Typography>
          <IconButton
            color="primary"
            disabled={labReport?.id === undefined}
            onClick={() =>
              navigate(`/dashboard/lab_report/details/${labReport?.id}`, {
                state: { goBack: true },
              })
            }
          >
            <SettingsOverscanIcon />
          </IconButton>
          {/* <IconButton
            color="primary"
            aria-label="edit"
            size="small"
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? (
              <SaveIcon fontSize="small" />
            ) : (
              <EditIcon fontSize="small" />
            )}
          </IconButton> */}
        </Box>
      )}
      <Box
        ref={ref}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "10px",
          height: { xs: !height || "600px", md: height },
          overflowY: isPreview && "auto",
          border: isPreview && "1px solid #ccc",
        }}
      >
        {logoState ? (
          <LetterHead isPreview={isPreview} isPrintMode={isPrintMode} />
        ) : (
          <img
            src={"/logos/letterhead mymyanmar.png"}
            alt="mylab logo"
            width="100%"
            height="100%"
          ></img>
        )}

        <Box paddingLeft="10px" paddingRight="10px" width="100%">
          <Grid container alignItems="flex-start" sx={{ marginBottom: "8px" }}>
            <Grid item xs={isPrintMode ? 4 : 12} sm={4}>
              {/* {isEditMode ? (
             <TextField label="Patient Name" size="small" />
           ) : ( */}
              <DetailsRow
                name="Name"
                value={labReport?.patient?.name}
                padding="0px"
                marginV="2px"
              />
              {/* )} */}
            </Grid>
            <Grid item xs={isPrintMode ? 4 : 12} sm={4}>
              {/* {isEditMode ? (
             <TextField
               label="Patient Sex"
               size="small"
               placeholder="YYYY-MM-DD"
             />
           ) : ( */}
              <DetailsRow
                name="Patient ID"
                value={labReport?.patient?.patient_id}
                padding="0px"
                marginV="2px"
              />
              {/* )} */}
            </Grid>
            <Grid item xs={isPrintMode ? 4 : 12} sm={4}>
              <DetailsRow
                name="Sample Type"
                value={labReport?.sample_type}
                padding="0px"
                marginV="2px"
              />
            </Grid>
            <Grid item xs={isPrintMode ? 4 : 12} sm={4}>
              {/* {isEditMode ? (
             <TextField
               label="Patient Sex"
               size="small"
               placeholder="YYYY-MM-DD"
             />
           ) : ( */}
              <DetailsRow
                name="Gender"
                value={capitalize(labReport?.patient?.gender)}
                padding="0px"
                marginV="2px"
              />
              {/* )} */}
            </Grid>
            <Grid item xs={isPrintMode ? 4 : 12} sm={4}>
              <DetailsRow
                name="Sample ID"
                value={labReport?.sample_id && padZero(labReport?.sample_id)}
                padding="0px"
                marginV="2px"
              />
            </Grid>
            <Grid item xs={isPrintMode ? 4 : 12} sm={4}>
              <DetailsRow
                name="Patient Type"
                value={labReport?.patient_type}
                padding="0px"
                marginV="2px"
              />
            </Grid>
            <Grid item xs={isPrintMode ? 4 : 12} sm={4}>
              <DetailsRow
                name="Age"
                value={labReport?.patient?.age}
                padding="0px"
                marginV="2px"
              />
            </Grid>

            <Grid item xs={isPrintMode ? 4 : 12} sm={4}>
              <DetailsRow
                name="Refer Dr."
                value={labReport?.doctor_name}
                padding="0px"
                marginV="2px"
              />
            </Grid>
            <Grid item xs={isPrintMode ? 4 : 12} sm={4}>
              {/* {isEditMode ? (
             <TextField label="Date" size="small" placeholder="YYYY-MM-DD" />
           ) : ( */}
              <DetailsRow
                name="Test Time"
                value={labReport?.test_date}
                padding="0px"
                marginV="2px"
              />
              {/* )} */}
            </Grid>
          </Grid>
          <TableContainer
            sx={{
              height: "33rem",
              backgroundImage: backgroundState
                ? `url('/logos/table background.png')`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Table
              size="small"
              sx={{
                [`& .${tableCellClasses.root}`]: {
                  borderBottom: "none",
                },
              }}
            >
              <TableHead>
                <TableRow
                  style={{
                    borderTop: "2px solid black",
                    borderBottom: "2px solid black",
                  }}
                >
                  <TableCell
                    padding="none"
                    sx={{
                      minWidth: "120px",
                    }}
                  >
                    Parameter
                  </TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Ref.range</TableCell>
                  <TableCell>Remark</TableCell>
                  {enableDelete && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <Box
                sx={{
                  height: "2rem",
                }}
              />
              <TableBody sx={{ fontWeight: "bold", padding: "80px 0px" }}>
                {testList.map((test) => {
                  return (
                    <>
                      <TableRow
                        key={test.test_id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          display: test?.test?.show_in_report_form
                            ? "block"
                            : "none",
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          colSpan={5}
                        >
                          <Typography
                            variant="body2"
                            sx={{ fontWeight: "bold", padding: "10px 0px" }}
                          >
                            {test.test_name}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      {labResult.map((lr) => {
                        if (lr.test_name === test.test_name) {
                          return (
                            <TableRow
                              key={lr.id}
                              selected={labResultForm?.id === lr?.id}
                              onClick={() => {
                                if (lr.id === labResultForm.id) {
                                  resetLabResultForm();
                                } else {
                                  setLabResultForm({
                                    ...lr,
                                  });
                                }
                              }}
                              sx={{
                                // border: 0,
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                                component="th"
                                scope="row"
                                padding="none"
                              >
                                {lr?.parameter_name}
                              </TableCell>
                              <TableCell>{lr?.result}</TableCell>
                              <TableCell>{lr?.unit}</TableCell>
                              <TableCell>
                                {(() => {
                                  if (lr?.lower_limit || lr?.upper_limit) {
                                    return `${lr?.lower_limit || "0"} - ${
                                      lr?.upper_limit || "0"
                                    }`;
                                  }
                                })()}
                              </TableCell>
                              <TableCell>{lr.remark}</TableCell>
                              {enableDelete && (
                                <TableCell maxwidth="4px">
                                  <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    onClick={() => deleteParameter(lr?.id)}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </TableCell>
                              )}
                            </TableRow>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {logoState && (
            <div
              style={{
                width: "100%",
                height: "4rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              {stampState ? (
                <div></div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <p
                    style={{
                      marginBottom: "3px",
                      font: "bold",
                      fontSize: "0.9rem",
                      color: "blue",
                    }}
                  >
                    Daw Yin Minn Thu
                  </p>
                  <p
                    style={{
                      marginTop: "3px",
                      font: "bold",
                      fontSize: "0.9rem",
                      color: "blue",
                    }}
                  >
                    B.Med.Tech (Laboratory)
                  </p>
                </div>
              )}
            </div>
          )}

          <div
            style={{
              width: "100%",
              height: "2rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "4px solid rgb(114, 220, 109)",
              /* Add any other styles you need */
            }}
          >
            <p style={{ marginTop: "0px" }}>End of Report</p>
          </div>
          {logoState ? (
            <div
              style={{
                width: "100%",
                height: "3rem",

                /* Add any other styles you need */
              }}
            ></div>
          ) : (
            <div
              style={{
                width: "100%",
                height: "8rem",
                display: "flex",
                flexDirection: "row",
                // backgroundImage: `url('/logos/mycare footer.png')`,
                // backgroundSize: 'cover',
                // backgroundPosition: 'center',
                /* Add any other styles you need */
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <div
                  style={{
                    width: "30%",
                    height: "100%",
                    // backgroundImage: `url('/logos/mylab logo.png')`,
                    // backgroundSize: 'cover',
                    // backgroundPosition: 'center',
                  }}
                >
                  {/* <img
            src={"/logos/mylab logo.png"}
            alt="mylab logo"
            width="100%"
            height="100%"
          ></img> */}
                  <MyLabLogo />
                </div>
                <div
                  style={{
                    width: "70%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    // backgroundColor: "rgb(254, 120, 212)",
                    //  alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "60%",
                      display: "flex",
                      flexDirection: "row",
                      backgroundColor: "rgb(134,242,227)",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        //marginLeft: "0.5rem",
                        width: "60%",
                        marginTop:"0.6rem",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "13px",
                          marginLeft: "1rem",
                          marginTop:"0.25rem",
                          color: "white",
                        }}
                      >
                        ကျန်းမာ‌ရေးစစ်ဆေးမှုတိုင်းအတွက်{" "}
                        <span style={{ fontSize: "17px", marginTop: "0px" }}>
                          MY Labs
                        </span>
                      </p>
                      <p
                        style={{
                          font: "caption",
                          fontSize: "1rem",
                          marginLeft: "1rem",
                          color: "white",
                        }}
                      >
                        The result you can trust.
                      </p>
                    </div>
                    <div
                      style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                        width: "40%",
                      }}
                    >
                      <p style={{ fontSize: "1rem" }}>Follow us on</p>
                      <div style={{ display: "flex", flexDirection: "row",marginTop:"-0.3rem" }}>
                        <div
                          style={{ marginTop: "1.5rem", marginLeft: "1rem" }}
                        >
                          <FaTwitter />
                        </div>
                        <div
                          style={{ marginTop: "1.5rem", marginLeft: "1rem" }}
                        >
                          <FaFacebookSquare />
                        </div>
                        <div
                          style={{ marginTop: "1.5rem", marginLeft: "1rem" }}
                        >
                          <FaInstagramSquare/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      height: "40%",
                      marginLeft: "1rem",
                      backgroundColor: "white",
                    }}
                  >
                    <p style={{ marginTop: "3px", height: "0.5rem",fontSize:"0.75rem" }}>
                      Head Office-N0.19/23, Zayyawaddy street, Baho Road,
                      Sanchaung, Yangon{" "}
                    </p>
                    <p style={{ marginTop: "0px", height: "0.5rem",fontSize:"0.75rem" }}>
                      Email-myanmar@mylab.com{" "}
                      <span style={{ marginLeft: "5rem" }}>
                        ℗ - 09892880288,09897602060
                      </span>{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Box>
    </>
  );
};

export default forwardRef(LabResultPreview);
