import pygame
import sys
import random

# Initialize Pygame
pygame.init()

# Set up display
WIDTH, HEIGHT = 800, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('2D Running Game')

# Define colors
SKY_BLUE = (135, 206, 235)
LIGHT_GREEN = (169, 223, 191)
RED = (255, 0, 0)
BLACK = (0, 0, 0)

# Character properties
character_size = 50
character_x = 50
character_y = HEIGHT - character_size - 10
character_y_change = 0
gravity = 0.5
jump_strength = 10
is_jumping = False

# Obstacle properties
obstacle_width = 20
obstacle_height = random.randint(20, 100)
obstacle_x = WIDTH
obstacle_y = HEIGHT - obstacle_height - 10
obstacle_speed = 5

# Main game loop
running = True
clock = pygame.time.Clock()
score = 0

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Get keys pressed
    keys = pygame.key.get_pressed()
    if keys[pygame.K_SPACE] and not is_jumping:
        is_jumping = True
        character_y_change = -jump_strength

    # Jump mechanics
    if is_jumping:
        character_y += character_y_change
        character_y_change += gravity
        if character_y >= HEIGHT - character_size - 10:  # Ground level
            character_y = HEIGHT - character_size - 10
            is_jumping = False

    # Move obstacle
    obstacle_x -= obstacle_speed

    # Reset obstacle when it goes off screen
    if obstacle_x < -obstacle_width:
        obstacle_x = WIDTH
        obstacle_height = random.randint(20, 100)
        obstacle_y = HEIGHT - obstacle_height - 10
        score += 1  # Increase score when successfully avoiding an obstacle

    # Fill the background
    screen.fill(LIGHT_GREEN)

    # Draw the character (red square)
    pygame.draw.rect(screen, RED, (character_x, character_y, character_size, character_size))

    # Draw the obstacle (black rectangle)
    pygame.draw.rect(screen, BLACK, (obstacle_x, obstacle_y, obstacle_width, obstacle_height))

    # Draw the score
    font = pygame.font.SysFont(None, 36)
    score_text = font.render(f'Score: {score}', True, BLACK)
    screen.blit(score_text, (10, 10))

    # Check for collision
    if (obstacle_x < character_x + character_size and
            obstacle_x + obstacle_width > character_x and
            obstacle_y < character_y + character_size and
            obstacle_y + obstacle_height > character_y):
        print(f"Game Over! Your score: {score}")
        running = False

    # Update the display
    pygame.display.flip()

    # Frame rate
    clock.tick(30)

# Quit Pygame
pygame.quit()
sys.exit()
import pygame
import sys
import random

# Initialize Pygame
pygame.init()

# Set up display
WIDTH, HEIGHT = 800, 400
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('2D Running Game')

# Define colors
SKY_BLUE = (135, 206, 235)
LIGHT_GREEN = (169, 223, 191)
RED = (255, 0, 0)
BLACK = (0, 0, 0)

# Character properties
character_size = 50
character_x = 50
character_y = HEIGHT - character_size - 10
character_y_change = 0
gravity = 0.5
jump_strength = 10
is_jumping = False

# Obstacle properties
obstacle_width = 20
obstacle_height = random.randint(20, 100)
obstacle_x = WIDTH
obstacle_y = HEIGHT - obstacle_height - 10
obstacle_speed = 5

# Game variables
score = 0
high_score = 0
difficulty_timer = 0
difficulty_increment = 3000  # Increase speed every 3 seconds
speed_increase = 0.5  # Increase speed by 0.5

# Main game loop
running = True
clock = pygame.time.Clock()

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Get keys pressed
    keys = pygame.key.get_pressed()
    if keys[pygame.K_SPACE] and not is_jumping:
        is_jumping = True
        character_y_change = -jump_strength

    # Jump mechanics
    if is_jumping:
        character_y += character_y_change
        character_y_change += gravity
        if character_y >= HEIGHT - character_size - 10:  # Ground level
            character_y = HEIGHT - character_size - 10
            is_jumping = False

    # Move obstacle
    obstacle_x -= obstacle_speed

    # Reset obstacle when it goes off screen
    if obstacle_x < -obstacle_width:
        obstacle_x = WIDTH
        obstacle_height = random.randint(20, 100)
        obstacle_y = HEIGHT - obstacle_height - 10
        score += 1  # Increase score when successfully avoiding an obstacle

    # Increase difficulty every few seconds
    difficulty_timer += clock.get_time()
    if difficulty_timer >= difficulty_increment:
        obstacle_speed += speed_increase  # Increase obstacle speed
        difficulty_timer = 0  # Reset timer

    # Fill the background
    screen.fill(LIGHT_GREEN)

    # Draw the character (red square)
    pygame.draw.rect(screen, RED, (character_x, character_y, character_size, character_size))

    # Draw the obstacle (black rectangle)
    pygame.draw.rect(screen, BLACK, (obstacle_x, obstacle_y, obstacle_width, obstacle_height))

    # Draw the score
    font = pygame.font.SysFont(None, 36)
    score_text = font.render(f'Score: {score}', True, BLACK)
    screen.blit(score_text, (10, 10))

    # Draw the high score
    high_score = max(high_score, score)  # Update high score if current score is higher
    high_score_text = font.render(f'High Score: {high_score}', True, BLACK)
    screen.blit(high_score_text, (10, 40))

    # Check for collision
    if (obstacle_x < character_x + character_size and
            obstacle_x + obstacle_width > character_x and
            obstacle_y < character_y + character_size and
            obstacle_y + obstacle_height > character_y):
        print(f"Game Over! Your score: {score}")
        running = False

    # Update the display
    pygame.display.flip()

    # Frame rate
    clock.tick(30)

# Quit Pygame
pygame.quit()
sys.exit()
