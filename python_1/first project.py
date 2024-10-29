# Import necessary modules
import pygame
import sys
import random

# Initialize Pygame and related settings
pygame.init()

# Set up the main display window's dimensions and title
WIDTH, HEIGHT = 800, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('2D Running Game')

# Define colors used in the game
SKY_BLUE = (135, 206, 235)  # Light blue for the sky background
LIGHT_GREEN = (169, 223, 191)  # Light green for the ground
RED = (255, 0, 0)  # Color for the main character
BLACK = (0, 0, 0)  # Color for obstacles

# Define character properties
character_size = 50  # Size of the main character (square dimensions)
character_x = 50  # X-position (horizontal) for the character's starting point
character_y = HEIGHT - character_size - 10  # Y-position (vertical) adjusted for ground level
character_y_change = 0  # Vertical change in character's position
gravity = 0.5  # Simulated gravity effect when jumping
jump_strength = 10  # Jump strength to propel the character upwards
is_jumping = False  # Boolean flag to track if character is in the jumping state

# Define obstacle properties
obstacle_width = 20  # Fixed width for each obstacle
obstacle_speed = 5  # Speed at which obstacles move towards the character
obstacles = []  # List to store dynamically generated obstacles

# Initialize game variables
score = 0  # Player's score for avoiding obstacles
high_score = 0  # Tracks the highest score achieved in the game
difficulty_timer = 0  # Timer for difficulty scaling
difficulty_increment = 3000  # Milliseconds before difficulty increase
speed_increase = 0.5  # Speed increase for obstacles at each difficulty increment

# Clock object to control game frame rate
clock = pygame.time.Clock()

# Function to create and return a new obstacle dictionary
def create_obstacle():
    """Generate and add a new obstacle to the obstacles list with random height."""
    height = random.randint(20, 100)  # Randomized height for variation in obstacles
    obstacle_x = WIDTH  # Starting x-position, right edge of the screen
    obstacle_y = HEIGHT - height - 10  # Y-position adjusted for ground level
    obstacles.append({'x': obstacle_x, 'y': obstacle_y, 'height': height})

# Function to handle user inputs, including game exit and jump action
def handle_events():
    """Handle Pygame events such as quitting and character jumping."""
    global is_jumping, character_y_change
    for event in pygame.event.get():  # Loop through all active events
        if event.type == pygame.QUIT:  # Check if the game window is closed
            pygame.quit()  # Exit the Pygame module
            sys.exit()  # Terminate the program

    # Check if spacebar is pressed to initiate a jump
    keys = pygame.key.get_pressed()
    if keys[pygame.K_SPACE] and not is_jumping:
        is_jumping = True  # Set jumping state to true
        character_y_change = -jump_strength  # Apply upward jump strength

# Function to update the character's position based on jump mechanics and gravity
def update_character():
    """Update character's vertical position considering jump and gravity."""
    global character_y, is_jumping, character_y_change
    if is_jumping:
        character_y += character_y_change  # Apply current vertical change
        character_y_change += gravity  # Increase downward speed by gravity
        if character_y >= HEIGHT - character_size - 10:  # Check ground level collision
            character_y = HEIGHT - character_size - 10  # Reset to ground level
            is_jumping = False  # Reset jumping state

# Function to update the position of obstacles and manage obstacle creation
def update_obstacles():
    """Move obstacles leftward and create new ones if needed."""
    global score
    for obstacle in obstacles:
        obstacle['x'] -= obstacle_speed  # Move obstacle leftward by speed

    # Remove obstacles that exit the screen and create new ones
    if obstacles and obstacles[0]['x'] < -obstacle_width:
        obstacles.pop(0)  # Remove off-screen obstacle
        create_obstacle()  # Generate new obstacle
        score += 1  # Increase score for successful avoidance

# Function to increase game difficulty by increasing obstacle speed
def increase_difficulty():
    """Periodically increase the speed of obstacles for added challenge."""
    global obstacle_speed, difficulty_timer
    difficulty_timer += clock.get_time()  # Increment timer by elapsed time
    if difficulty_timer >= difficulty_increment:
        obstacle_speed += speed_increase  # Increase speed by predefined increment
        difficulty_timer = 0  # Reset the difficulty timer

# Function to check if the character collides with an obstacle
def check_collision():
    """Detect collision between character and obstacles."""
    for obstacle in obstacles:
        # Collision detection based on bounding box overlap
        if (obstacle['x'] < character_x + character_size and
            obstacle['x'] + obstacle_width > character_x and
            obstacle['y'] < character_y + character_size and
            obstacle['y'] + obstacle['height'] > character_y):
            print(f"Game Over! Your score: {score}")
            reset_game()  # Call game reset function if collision occurs

# Function to reset the game state after collision
def reset_game():
    """Reset game elements to initial values after a collision."""
    global score, obstacle_speed, obstacles, is_jumping
    is_jumping = False  # Reset jumping state
    score = 0  # Reset score to zero
    obstacle_speed = 5  # Reset speed to default
    obstacles.clear()  # Clear all obstacles
    create_obstacle()  # Create a starting obstacle

# Function to render all game visuals, including the character and obstacles
def render_screen():
    """Draw all game elements on the screen."""
    screen.fill(LIGHT_GREEN)  # Background color for the ground

    # Draw character as a square with red color
    pygame.draw.rect(screen, RED, (character_x, character_y, character_size, character_size))

    # Iterate through obstacles and draw each one
    for obstacle in obstacles:
        pygame.draw.rect(screen, BLACK, (obstacle['x'], obstacle['y'], obstacle_width, obstacle['height']))

    # Display the current score and high score
    render_text(f'Score: {score}', 10, 10)
    render_text(f'High Score: {high_score}', 10, 40)

    # Update display to reflect drawn elements
    pygame.display.flip()

# Function to render text on the screen for displaying information
def render_text(text, x, y):
    """Render specified text at a specific screen position."""
    font = pygame.font.SysFont(None, 36)
    label = font.render(text, True, BLACK)
    screen.blit(label, (x, y))

# Main game loop function
def game_loop():
    """Primary game loop that keeps the game running."""
    global high_score
    create_obstacle()  # Initialize with a single obstacle

    while True:
        handle_events()  # Process user input
        update_character()  # Update character position
        update_obstacles()  # Move and manage obstacles
        increase_difficulty()  # Adjust difficulty over time
        check_collision()  # Check for collisions
        render_screen()  # Render all game elements
        high_score = max(high_score, score)  # Update high score
        clock.tick(30)  # Control the game's frame rate

# Run the game loop if the script is executed directly
if __name__ == "__main__":
    game_loop()
