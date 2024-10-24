import pygame
import sys
import random

# Initialize Pygame
pygame.init()

# Set up display dimensions and window title
WIDTH, HEIGHT = 800, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('2D Running Game')

# Define colors used in the game
SKY_BLUE = (135, 206, 235)
LIGHT_GREEN = (169, 223, 191)
RED = (255, 0, 0)
BLACK = (0, 0, 0)

# Character properties
character_size = 50
character_x = 50
character_y = HEIGHT - character_size - 10  # Ground position
character_y_change = 0
gravity = 0.5  # Gravity effect when jumping
jump_strength = 10  # Character jump power
is_jumping = False  # Status for jumping

# Obstacle properties and list to hold multiple obstacles
obstacle_width = 20
obstacle_speed = 5
obstacles = []  # List to store multiple obstacles

# Game variables
score = 0  # Current score
high_score = 0  # High score tracker
difficulty_timer = 0  # Timer to increase difficulty
difficulty_increment = 3000  # Time in milliseconds after which difficulty increases
speed_increase = 0.5  # Amount to increase obstacle speed each time

# Clock to control the frame rate
clock = pygame.time.Clock()

# Custom function to create a new obstacle and add it to the obstacles list
def create_obstacle():
    """Generate a new obstacle with random height and position."""
    height = random.randint(20, 100)  # Random height for obstacle
    obstacle_x = WIDTH  # Start from the right side of the screen
    obstacle_y = HEIGHT - height - 10  # Ground position
    obstacles.append({'x': obstacle_x, 'y': obstacle_y, 'height': height})  # Add to the list

# Function to handle game events such as quitting the game or jumping
def handle_events():
    """Handle user inputs like quitting or jumping."""
    global is_jumping, character_y_change
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            sys.exit()

    # Check if the spacebar is pressed for jumping
    keys = pygame.key.get_pressed()
    if keys[pygame.K_SPACE] and not is_jumping:
        is_jumping = True
        character_y_change = -jump_strength  # Set upward movement for the jump

# Update the character's position based on jumping mechanics and gravity
def update_character():
    """Update the character's position based on jump and gravity."""
    global character_y, is_jumping, character_y_change
    if is_jumping:
        character_y += character_y_change  # Update character's vertical position
        character_y_change += gravity  # Simulate gravity
        if character_y >= HEIGHT - character_size - 10:  # Check if on the ground
            character_y = HEIGHT - character_size - 10  # Set character on the ground
            is_jumping = False  # Stop jumping when on the ground

# Update the position of all obstacles in the list and create new ones
def update_obstacles():
    """Update obstacle positions and remove those that leave the screen."""
    global score
    for obstacle in obstacles:
        obstacle['x'] -= obstacle_speed  # Move the obstacle leftwards

    # Remove obstacles that have moved off the screen and generate new ones
    if obstacles and obstacles[0]['x'] < -obstacle_width:
        obstacles.pop(0)  # Remove the first obstacle when it moves out of the screen
        create_obstacle()  # Create a new obstacle
        score += 1  # Increment score when an obstacle is successfully avoided

# Increase the game's difficulty by speeding up the obstacles
def increase_difficulty():
    """Increase obstacle speed over time to make the game harder."""
    global obstacle_speed, difficulty_timer
    difficulty_timer += clock.get_time()
    if difficulty_timer >= difficulty_increment:
        obstacle_speed += speed_increase  # Increase obstacle speed
        difficulty_timer = 0  # Reset the timer

# Check if the character collides with any of the obstacles
def check_collision():
    """Check if the character collides with an obstacle."""
    for obstacle in obstacles:
        if (obstacle['x'] < character_x + character_size and
            obstacle['x'] + obstacle_width > character_x and
            obstacle['y'] < character_y + character_size and
            obstacle['y'] + obstacle['height'] > character_y):
            print(f"Game Over! Your score: {score}")
            reset_game()  # Call custom function to reset the game

# Custom function to reset the game after a collision
def reset_game():
    """Reset the game state after the player collides with an obstacle."""
    global score, obstacle_speed, obstacles, is_jumping
    is_jumping = False  # Reset jumping state
    score = 0  # Reset score
    obstacle_speed = 5  # Reset obstacle speed to default
    obstacles.clear()  # Clear all obstacles
    create_obstacle()  # Create the first obstacle again

# Render (draw) the character, obstacles, score, and background on the screen
def render_screen():
    """Render the game elements on the screen."""
    screen.fill(LIGHT_GREEN)  # Fill the background with light green

    # Draw the character as a red square
    pygame.draw.rect(screen, RED, (character_x, character_y, character_size, character_size))

    # Iterate through the list of obstacles and draw each one
    for obstacle in obstacles:
        pygame.draw.rect(screen, BLACK, (obstacle['x'], obstacle['y'], obstacle_width, obstacle['height']))

    # Render the score and high score
    render_text(f'Score: {score}', 10, 10)
    render_text(f'High Score: {high_score}', 10, 40)

    # Update the display after drawing all elements
    pygame.display.flip()

# Helper function to display text on the screen
def render_text(text, x, y):
    """Render text on the screen at the given (x, y) coordinates."""
    font = pygame.font.SysFont(None, 36)
    label = font.render(text, True, BLACK)
    screen.blit(label, (x, y))

# Main game loop
def game_loop():
    """Main game loop to keep the game running."""
    global high_score
    create_obstacle()  # Generate the first obstacle at the start

    while True:
        handle_events()  # Handle user input events
        update_character()  # Update character position
        update_obstacles()  # Move and create obstacles
        increase_difficulty()  # Make the game harder over time
        check_collision()  # Check if the character hits any obstacle
        render_screen()  # Render everything on the screen
        high_score = max(high_score, score)  # Update high score
        clock.tick(30)  # Set the frame rate

# Run the game
if __name__ == "__main__":
    game_loop()
