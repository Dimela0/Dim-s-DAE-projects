import pygame
import random

# Initialize pygame
pygame.init()

# Screen dimensions
SCREEN_WIDTH = 800
SCREEN_HEIGHT = 400

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GREEN = (0, 255, 0)
JUNGLE_GREEN = (34, 139, 34)

# Set up the display
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("Jungle Runner")

# Frame rate
clock = pygame.time.Clock()
FPS = 60

# Load assets
player_img = pygame.image.load("assets/player.png")
obstacle_img = pygame.image.load("assets/obstacle.png")
background_img = pygame.image.load("assets/background.png")

# Player settings
player_width, player_height = 50, 50
player_x = 100
player_y = SCREEN_HEIGHT - player_height - 10
player_speed = 8
is_jumping = False
jump_velocity = 15
gravity = 1

# Obstacle settings
obstacle_width, obstacle_height = 50, 50
obstacle_speed = 5

# Font for score
font = pygame.font.Font(None, 36)

# Game variables
score = 0
high_score = 0
difficulty = 1
obstacles = []
game_over = False

def draw_player():
    screen.blit(player_img, (player_x, player_y))

def draw_obstacle(obstacle_x, obstacle_y):
    screen.blit(obstacle_img, (obstacle_x, obstacle_y))

def display_score(score):
    text = font.render(f"Score: {score}", True, WHITE)
    screen.blit(text, (10, 10))

def display_high_score(high_score):
    text = font.render(f"High Score: {high_score}", True, WHITE)
    screen.blit(text, (SCREEN_WIDTH - 200, 10))

def increase_difficulty(score):
    global difficulty, obstacle_speed
    difficulty = 1 + score // 10  # Increase difficulty every 10 points
    obstacle_speed = 5 + difficulty

# Main game loop
def game_loop():
    global player_y, is_jumping, jump_velocity, score, high_score, game_over, obstacles
    
    # Reset game state
    score = 0
    player_y = SCREEN_HEIGHT - player_height - 10
    is_jumping = False
    jump_velocity = 15
    obstacles = []
    game_over = False

    # Game loop
    while True:
        screen.blit(background_img, (0, 0))  # Draw background

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                return

        # Key handling
        keys = pygame.key.get_pressed()
        if keys[pygame.K_SPACE] and not is_jumping:
            is_jumping = True

        # Jump logic
        if is_jumping:
            player_y -= jump_velocity
            jump_velocity -= gravity
            if jump_velocity < -15:
                is_jumping = False
                jump_velocity = 15

        # Add obstacles
        if len(obstacles) == 0 or obstacles[-1][0] < SCREEN_WIDTH - 300:
            obstacle_x = SCREEN_WIDTH
            obstacle_y = SCREEN_HEIGHT - obstacle_height - 10
            obstacles.append([obstacle_x, obstacle_y])

        # Move and draw obstacles
        for obstacle in obstacles:
            obstacle[0] -= obstacle_speed
            draw_obstacle(obstacle[0], obstacle[1])
            if obstacle[0] + obstacle_width < 0:
                obstacles.remove(obstacle)
                score += 1
                increase_difficulty(score)

            # Check for collision
            if player_x + player_width > obstacle[0] and player_x < obstacle[0] + obstacle_width:
                if player_y + player_height > obstacle[1]:
                    game_over = True

        draw_player()
        display_score(score)
        display_high_score(high_score)

        if game_over:
            if score > high_score:
                high_score = score
            game_loop()

        pygame.display.update()
        clock.tick(FPS)

# Run the game
if __name__ == "__main__":
    game_loop()
