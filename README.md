# GMaps

This Django web application integrates with the Google Maps API to retrieve directions and calculate distances between locations.

## Features

- **Django Integration**: Built using the Django web framework for backend development.
- **Google Maps API Integration**: Utilizes the Google Maps API to retrieve directions and calculate distances between locations.
- **Direction Retrieval**: Allows users to input starting and destination locations to obtain detailed directions.
- **Distance Calculation**: Provides functionality to calculate the distance between two locations.

## Prerequisites

Before running the application, ensure you have the following installed:

- Python 3.x
- Django
- Google Maps API key (Get one from the Google Cloud Platform console)

## Installation

1. Clone this repository to your local machine: git clone https://github.com/your_username/your_project.git
   
2. Navigate to the project directory: cd your_project

3. Install the required Python packages: pip install -r requirements.txt

4. Set up your Google Maps API key:
   - Open `settings.py` and replace `'YOUR_API_KEY'` with your actual Google Maps API key.

5. Run migrations to set up the database: python manage.py migrate

6. Start the Django development server: python manage.py runserver

7. Open your web browser and go to `http://127.0.0.1:8000/` to access the application.

## Usage

- Navigate to the homepage of the application.
- Enter the starting and destination locations in the provided input fields.
- Click on the "Get Directions" button to retrieve the directions between the locations.
- Optionally, you can also calculate the distance between two locations by entering them in the designated input fields and clicking the "Calculate Distance" button.

## License

This project is licensed under the [MIT License](LICENSE).




