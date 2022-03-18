import Modal from "../common/Modal";
import {getDate, toLocaleString} from "../../services/helpers";
import {Box, Divider, List, ListItem, ListItemText, Typography} from "@mui/material";
import {MONTHLY_PAYMENT_TYPES, PAYMENT_METHODS, SERVICES_TYPES} from "../../constants";

const InvoiceModal = ({setOpenInvoiceModal, openInvoiceModal, invoice}) => {
    const ItemsList = () => {
        return (
            <Box>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {(invoice?.invoiceItems || []).map((item) => (
                        <ListItem
                            key={item._id}
                            disableGutters
                        >
                            <Box
                                sx={{
                                    display: 'grid',
                                    gap: 2,
                                    gridTemplateColumns: 'repeat(2, 1fr)'
                                }}
                            >
                                <Box>
                                    <ListItemText primary={
                                        `${
                                            Object.keys(SERVICES_TYPES)
                                                .map((key) => SERVICES_TYPES[key])
                                                .find((el) => el.value ===  item.type).label
                                        }`} />
                                    <ListItemText primary={
                                        item.type === SERVICES_TYPES.REGISTRATION.value ? item.reason:
                                            `${
                                                Object.keys(MONTHLY_PAYMENT_TYPES)
                                                    .map((key) => MONTHLY_PAYMENT_TYPES[key])
                                                    .find((el) => el.value ===  item.reason).label
                                            }`} />
                                </Box>
                                <ListItemText primary={` : ${
                                    toLocaleString(item.totalPrice)
                                }`} />
                            </Box>

                        </ListItem>
                    ))}
                </List>
                <Box
                    sx={{
                        display: 'grid',
                        gap: 2,
                        gridTemplateColumns: 'repeat(2, 1fr)'
                    }}
                >
                    <Typography>
                        Monto Total
                    </Typography>
                    <Typography>
                        {': '+toLocaleString(invoice.amount)}
                    </Typography>
                </Box>
            </Box>
        )
    }
    const InvoiceSummary = () => {
        return (
            <Box>
                <Box sx={{
                    display: 'grid',
                    columnGap: 3,
                    gap: 1,
                    gridTemplateColumns: 'repeat(2, 1fr)'
                }}>
                    <Typography>
                        Fecha de emisión
                    </Typography>
                    <Typography>
                        {getDate(invoice.date)}
                    </Typography>
                    <Typography>
                        Razon Social:
                    </Typography>
                    <Typography>
                        {invoice.student[0].name +
                        " " +
                        invoice.student[0].fatherSurname +
                        " " +
                        invoice.student[0].motherSurname}
                    </Typography>
                    <Typography>
                        Metodo de pago
                    </Typography>
                    <Typography>
                        {
                            Object.keys(PAYMENT_METHODS)
                                .map((key) => PAYMENT_METHODS[key])
                                .find((el) => el.value ===  invoice.paymentMethod).label
                        }
                    </Typography>
                    <Box />
                    <Box p={2}>
                        <Divider />
                        {<ItemsList />}
                        <Divider />
                    </Box>

                </Box>
            </Box>
        )
    }
    return(
        <Modal
            open={openInvoiceModal}
            title={"Codigo de Boleta: "+ invoice.code}
            children={ <InvoiceSummary /> }
            hideCancelButton={false}
            onCancel={() => {
                setOpenInvoiceModal(false)
            }}
        />
    );
}

export default InvoiceModal;