import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography
} from '@material-tailwind/react'
import PropTypes from 'prop-types'
import SyncLoader from 'react-spinners/SyncLoader' // Import SyncLoader

export function StatisticsCard({ color, icon, title, value, footer, loading }) {
  console.log(icon)
  return (
    <Card className="border border-blue-gray-100 shadow-sm h-40">
      {' '}
      {/* Fixed height for card */}
      <CardHeader
        variant="gradient"
        color={'gray'}
        floated={false}
        shadow={true}
        className="absolute grid h-12 w-12 place-items-center"
      >
        {/* Show SyncLoader for the icon when loading */}
        {icon}
      </CardHeader>
      <CardBody className="p-4 text-right">
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray">
          {/* Show SyncLoader for the value while loading */}
          {loading ? (
            <SyncLoader color={'#000'} size={8} />
          ) : (
            value // Show the actual value when data is loaded
          )}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 p-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  )
}

StatisticsCard.defaultProps = {
  color: 'blue',
  footer: null
}

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    'white',
    'blue-gray',
    'gray',
    'brown',
    'deep-orange',
    'orange',
    'amber',
    'yellow',
    'lime',
    'light-green',
    'green',
    'teal',
    'cyan',
    'light-blue',
    'blue',
    'indigo',
    'deep-purple',
    'purple',
    'pink',
    'red'
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
  loading: PropTypes.bool // Add loading prop to conditionally render loader
}

StatisticsCard.displayName = '/src/widgets/cards/statistics-card.jsx'

export default StatisticsCard
