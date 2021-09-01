
import React from 'react';
import { useEffect, useState  } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';



import "./clientes.scss";

function createData(name, nickname, phone, address, houseReferences, img,ordersHistory = [{ date: '2020-01-05', ticket: '11091700', amount: 3 },
{ date: '2020-01-02', ticket: '133324', amount: 1 },],id) {
    return {
    name,
    nickname,
    phone,
    address,
    houseReferences,
    img,
    ordersHistory,
    id
};
}
const rows = [
    createData('Aldo Navarrete', "El mejor", "5578590724", "Genaro Nunez mz17 lt67 col El tepetatal", "Fachada amarilla","img",[{date:"2021-09-29", ticket:"12335",totalAmount:10000}],0),
    createData("Raul Jimenez","Bichomexicano","237482732","Calle Moctezuma #16 col Nicho","Esquina zaguán verde","img de raul.png",[
        {date:"2021-09-29", ticket:"123123",totalAmount:15000},
        {date:"2021-09-28", ticket:"d23234",totalAmount:13000},
        {date:"2021-09-27", ticket:"42332d",totalAmount:18000}
    ],1),
    createData('Aldo Navarrete', "El mejor", "5578590724", "Genaro Nunez mz17 lt67 col El tepetatal", "Fachada amarilla","img",[{date:"2021-09-29", ticket:"12335",totalAmount:10000}],2),
    createData("Raul Jimenez","Bichomexicano","237482732","Calle Moctezuma #16 col Nicho","Esquina zaguán verde","img de raul.png",[
        {date:"2021-09-29", ticket:"123123",totalAmount:15000},
        {date:"2021-09-28", ticket:"d23234",totalAmount:13000},
        {date:"2021-09-27", ticket:"42332d",totalAmount:18000}
    ],3),
    createData('Aldo Navarrete', "El mejor", "5578590724", "Genaro Nunez mz17 lt67 col El tepetatal", "Fachada amarilla","img",[{date:"2021-09-29", ticket:"12335",totalAmount:10000}],4),
    createData("Raul Jimenez","Bichomexicano","237482732","Calle Moctezuma #16 col Nicho","Esquina zaguán verde","img de raul.png",[
        {date:"2021-09-29", ticket:"123123",totalAmount:15000},
        {date:"2021-09-28", ticket:"d23234",totalAmount:13000},
        {date:"2021-09-27", ticket:"42332d",totalAmount:18000}
    ],5),
    
];

export default function Clientes() {
    const [data, setData] = useState([]);
    const [ready, setReady] = useState(false);
    const [totalClientes, setTotalClientes] = useState(0);
    const fetchData = async (name,nickname,phone,address,references) =>{ 
        const url = "http://localhost:8080/clientes"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: name,sobrenombre:nickname,telefono:phone,direccion:address,referencias:references })
        };
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        setData(data);
        setReady(true);
    }
    const handleSubmit = (e) => {
        //Destructurando las respuestas del form
        let {
            name:{value:name},
            nickname:{value:nickname},
            phone:{value:phone},
            address:{value:address},
            references:{value:references}
            } = e.target;
    
        nickname = nickname || "SIN_SOBRENOMBRE";
        e.preventDefault();
        fetchData(name,nickname,phone,address,references)
        ;
    };
    useEffect(() => {
        fetch("http://localhost:8080/clientes")
        .then(res => res.json())
        .then(({total,clientes}) =>{
            setData(clientes);
            setTotalClientes(total);
        })
        .catch(console.log)
        .finally(setReady(true));
      },[]);


    return (
        <div className="clientes">
        <div className="containerWrapper">
            <form onSubmit={(e)=>handleSubmit(e)}>
                <FormControl className="form-control"
                >
                    <div className="input">
                        <TextField 
                        name="name"
                        required     id="standard-required" label="Nombre"  />
                    </div>
                    <div className="input">
                        <TextField
                            
                            name="nickname"
                            id="standard-basic"
                            label="Sobrenombre"
                        />
                    </div>
                    <div className="input">
                        <TextField required
                        name="phone"
                        id="standard-required" label="Teléfono"/>
                    </div>
                    <div className="input">
                    <TextField
                        required
                        name="address"
                        id="standard-textarea"
                        label="Dirección"
                        placeholder="p.ej. Genaro Nunez mz17 lt67"
                        multiline
                        />
                    </div>
                    <div className="input">
                    <TextField
                        required
                        name="references"
                        id="standard-textarea"
                        label="Referencias"
                        placeholder="p.ej. Al lado de una tienda"
                        multiline
                        />
                    </div>
                    <div className="input">
                        <Button 
                        name="btn"
                        variant="outlined" color="primary"
                        type="submit"
                        >
                            Crear Cliente
                        </Button>
                    </div>
                </FormControl>
            </form>
        </div>
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Nombre</TableCell>
                        <TableCell align="right">Sobrenombre (opcional)</TableCell>
                        <TableCell align="right">Teléfono</TableCell>
                        <TableCell align="right">Dirección</TableCell>
                        <TableCell align="right">Referencias</TableCell>
                        <TableCell align="right">Imagen fachada</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        {ready ?
        ( 
          data.map(({_id,nombre}) =>(    
                  <div key={_id}>
                    <h1>{nombre}</h1>
                    <h1>{totalClientes}</h1>
                  </div>
              ))
        ):(<div>Loading... Right now!</div>)
        }
    </div>
    )
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
},
});


Row.propTypes = {
    row: PropTypes.shape({      
        name: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired,
        ordersHistory: PropTypes.arrayOf(
            PropTypes.shape({
            date: PropTypes.string.isRequired,
            ticket: PropTypes.string.isRequired,
            totalAmount: PropTypes.number.isRequired,
            }),
        ).isRequired,
      phone: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      houseReferences: PropTypes.string.isRequired,
      img: PropTypes.string
    }).isRequired,
  };
  
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.nickname}</TableCell>
        <TableCell align="right">{row.phone}</TableCell>
        <TableCell align="right">{row.address}</TableCell>
        <TableCell align="right">{row.houseReferences}</TableCell>
        <TableCell align="right">{row.img}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Historial
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Ticket</TableCell>
                    <TableCell align="right">Precio total ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.ordersHistory.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.ticket}</TableCell>
                      <TableCell align="right">{historyRow.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}




